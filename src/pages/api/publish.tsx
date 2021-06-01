import mqttClient from '@app/mqtt-client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      mqttClient.publish('@msg/alarm', 'on')
      res.status(200).send('Publish Success')
    }
  } catch (err) {
    res.status(400).send('Something went wrong')
  }
}
