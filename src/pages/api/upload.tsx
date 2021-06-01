import { firestore } from '../../lib/firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'
import { format } from 'date-fns'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || ''

async function uploadToFirebase(user: string, deviceName: string, image: string) {
  await firestore.collection('captures').add({
    user: user,
    image: image,
    deviceName: deviceName,
    timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const token = req.body.token as string
      const base64 = req.body.image as string
      console.log('TOKEN', token)
      const { user, deviceName } = jwt.verify(token, secret) as { user: string; deviceName: string }
      console.log(user, deviceName)
      await uploadToFirebase(user, deviceName, base64)
      res.status(200).send('Upload file success')
    }
  } catch (err) {
    res.status(400).send('Something went wrong')
  }
}
