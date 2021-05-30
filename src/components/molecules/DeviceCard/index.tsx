import { MoreAction } from '@app/components/atoms'
import { DeviceDTO } from '@app/dto/devices'
import { Card } from 'antd'
import './style.less'

export interface DeviceCardProps extends DeviceDTO {}

export const DeviceCard: React.FC<DeviceCardProps> = ({ name, lastActive }) => {
  return (
    <Card
      className="capture-card"
      title={name}
      extra={<MoreAction onDelete={() => console.log('wow')} />}
    >
      <div className="content">Last Active: {lastActive}</div>
    </Card>
  )
}
