import mqtt from 'mqtt'
import axios from 'axios'
import { format } from 'date-fns'

const mqttClient: mqtt.MqttClient = mqtt.connect('wss://mqtt.netpie.io/mqtt', {
  clientId: process.env.MQTT_CLIENT_ID,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
})

mqttClient.on('connect', () => {
  console.log('Connected to MQTT')
  mqttClient?.subscribe('@msg/img')
})

mqttClient.on('error', () => {
  console.log('Unable to connect MQTT')
})

mqttClient.on('message', async (topic: string, payload: Buffer) => {
  try {
    if (topic === '@msg/img') {
      const parse = JSON.parse(Buffer.from(payload).toString()) as { token: string; image: string }
      const token = parse.token
      const base64 = parse.image
      await axios.post(
        `${process.env.NEXTAUTH_URL}/api/upload`,
        {
          token: token,
          image: base64,
          timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        },
        { timeout: 100000 },
      )
    }
  } catch (err) {
    console.log(err)
  }
})

export default mqttClient
