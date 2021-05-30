import { getToken } from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
import { httpClient } from '@app/config/http'
import { DeviceDTO } from '@app/dto/devices'

const secret = process.env.NEXT_AUTH_SECRET || ''

const mockDevices: DeviceDTO[] = [
  {
    name: 'Front',
    lastActive: '1/10/2000 12:30',
  },
  {
    name: 'Back',
    lastActive: '1/10/2000 12:40',
  },
]

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req, secret })
    if (token?.accessToken) {
      //const { data } = httpClient.get('/path/to/get/device')
      res.status(200).json(mockDevices)
    } else {
      res.status(401).send('UNAUTHORIZED')
    }
  } catch (err) {
    res.status(400).send('Something went wrong')
  }
}
