import { getToken } from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../lib/firebase-admin'
import { DeviceDTO } from '../../dto/devices'
import { getSession } from 'next-auth/client'
import jwt from 'jsonwebtoken'

const secret = process.env.NEXT_AUTH_SECRET || ''
const jwtSecret = process.env.JWT_SECRET || ''

const post = async (req: NextApiRequest) => {
  const name = req.body.name as string
  const timestamp = req.body.timestamp as string
  const token = await getToken({ req, secret })
  const session = await getSession({ req })
  if (token?.accessToken && session?.user) {
    const user = session.user.email
    const snapshot = await firestore.collection('devices').where('user', '==', user).get()
    let id = undefined
    snapshot.forEach(doc => {
      if ((doc.data() as DeviceDTO).name === name) id = doc.id
    })
    if (id) throw new Error("the name isn't unique")
    const tk = jwt.sign({ user: user, deviceName: name }, jwtSecret)
    await firestore.collection('devices').add({
      _id: id,
      user: user,
      name: name,
      lastActive: timestamp,
    })
    return tk
  }
}

const get = async (req: NextApiRequest) => {
  const allDevice: Omit<DeviceDTO, 'user'>[] = []
  const token = await getToken({ req, secret })
  const session = await getSession({ req })
  if (token?.accessToken && session?.user) {
    const user = session.user.email
    const snapshot = await firestore.collection('devices').where('user', '==', user).get()
    snapshot.forEach(doc => {
      const { user, ...rest } = doc.data() as DeviceDTO
      allDevice.push({ _id: doc.id, ...rest })
    })
  }
  return allDevice
}

const del = async (req: NextApiRequest) => {
  const token = await getToken({ req, secret })
  const session = await getSession({ req })
  if (token?.accessToken && session?.user) {
    const id = req.query.id as string
    await firestore.collection('devices').doc(id).delete()
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req, secret })
    const session = await getSession({ req })
    if (token?.accessToken && session?.user) {
      if (req.method === 'POST') {
        const tk = await post(req)
        res.status(200).json({ token: tk })
      } else if (req.method === 'GET') {
        const allDevice = await get(req)
        res.status(200).json(allDevice)
      } else if (req.method === 'DELETE') {
        await del(req)
        res.status(200).send(('Delete success' + req.query.id) as string)
      }
    } else {
      res.status(401).send('UNAUTHORIZED')
    }
  } catch (err) {
    res.status(400).send('Something went wrong')
  }
}
