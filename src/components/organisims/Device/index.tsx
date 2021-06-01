import { Error, Loading } from '../../atoms'
import { DeviceCard } from '../../molecules/DeviceCard'
import { Col, Row } from 'antd'
import { useData } from 'context'
require('./style.less')

export interface DeviceProps {}

export const Device: React.FC<DeviceProps> = () => {
  const { deviceData, deviceError } = useData()

  if (deviceError) return <Error />
  if (!deviceData) return <Loading />

  return (
    <Row gutter={[16, 16]} className="device">
      {deviceData.map(item => (
        <Col sm={12} md={12} lg={8} className="gutter-row" key={item._id}>
          <DeviceCard {...item} />
        </Col>
      ))}
    </Row>
  )
}
