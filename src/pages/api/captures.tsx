import { getToken } from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
import { httpClient } from '@app/config/http'
import { CaptureDTO } from '@app/dto/capture'

const secret = process.env.NEXT_AUTH_SECRET || ''

const mockCaptures: CaptureDTO[] = [
  {
    name: 'Front',
    imageURL: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    createdDate: '12/10/2021 12:00',
  },
  {
    name: 'Back',
    imageURL: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    createdDate: '12/10/2021 12:00',
  },
  {
    name: 'Back',
    imageURL: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    createdDate: '12/10/2021 12:00',
  },
  {
    name: 'Back',
    imageURL: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    createdDate: '12/10/2021 12:00',
  },
  {
    name: 'Back',
    imageURL: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    createdDate: '12/10/2021 12:00',
  },
  {
    name: 'Back',
    imageURL: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    createdDate: '12/10/2021 12:00',
  },
  {
    name: 'Back',
    imageURL: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    createdDate: '12/10/2021 12:00',
  },
]

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req, secret })
    if (token?.accessToken) {
      //const { data } = httpClient.get('/path/to/get/device')
      res.status(200).json(mockCaptures)
    } else {
      res.status(401).send('UNAUTHORIZED')
    }
  } catch (err) {
    res.status(400).send('Something went wrong')
  }
}
