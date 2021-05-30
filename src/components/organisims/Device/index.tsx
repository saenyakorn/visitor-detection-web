import { Error, Loading } from '@app/components/atoms'
import { DeviceCard } from '@app/components/molecules/DeviceCard'
import { DeviceDTO } from '@app/dto/devices'
import { Col, Row } from 'antd'
import axios from 'axios'
import useSWR from 'swr'
import './style.less'

export interface DeviceProps {}

const fetcher = () => axios.get<DeviceDTO[]>('/api/devices').then(result => result.data)

export const Device: React.FC<DeviceProps> = () => {
  const { data, error } = useSWR('/api/devices', fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  return (
    <Row gutter={[16, 16]} className="device">
      {data.map((item, index) => (
        <Col sm={12} className="gutter-row" key={`device-${index}`}>
          <DeviceCard {...item} />
        </Col>
      ))}
    </Row>
  )
}
