import { firestore } from '../../lib/firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { DeviceDTO } from '../../dto/devices'

const secret = process.env.JWT_SECRET || ''

async function uploadToFirebase(
  user: string,
  deviceName: string,
  image: string,
  timestamp: string,
) {
  await firestore.collection('captures').add({
    user: user,
    image: image,
    deviceName: deviceName,
    timestamp: timestamp,
  })
  const snapshot = await firestore.collection('devices').where('user', '==', user).get()
  snapshot.forEach(async doc => {
    if ((doc.data() as DeviceDTO).name === deviceName)
      await firestore.collection('devices').doc(doc.id).update({
        lastActive: timestamp,
      })
  })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const token = req.body.token as string
      const base64 = req.body.image as string
      const timestamp = req.body.timestamp as string
      const { user, deviceName } = jwt.verify(token, secret) as { user: string; deviceName: string }
      await uploadToFirebase(user, deviceName, base64, timestamp)
      res.status(200).send('Upload file success')
    }
  } catch (err) {
    res.status(400).send('Something went wrong')
  }
}
