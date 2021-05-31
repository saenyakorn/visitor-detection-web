import { getToken } from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
import { CaptureDTO } from '@app/dto/capture'
import { firestore } from '@app/lib/firebase-admin'
import { getSession } from 'next-auth/client'

const secret = process.env.NEXT_AUTH_SECRET || ''

const findCaptures = async (user: string) => {
  const collection = firestore.collection('captures')
  const snapshot = await collection.where('user', '==', user).get()
  if (snapshot.empty) return []
  const captures: Omit<CaptureDTO, 'user'>[] = []
  snapshot.forEach(doc => {
    const { user, ...rest } = doc.data() as CaptureDTO
    captures.push(rest)
  })
  return captures
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req, secret })
    const session = await getSession({ req })
    if (token?.accessToken && session?.user) {
      if (req.method === 'GET') {
        const user = session.user.email
        const captures = await findCaptures(user as string)
        res.status(200).json(captures)
      }
    } else {
      res.status(401).send('UNAUTHORIZED')
    }
  } catch (err) {
    res.status(400).send('Something went wrong')
  }
}
