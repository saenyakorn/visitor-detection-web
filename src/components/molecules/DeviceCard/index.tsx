import { MoreAction } from '@app/components/atoms'
import { httpClient } from '@app/config/http'
import { DeviceDTO } from '@app/dto/devices'
import { Button, Card } from 'antd'
import './style.less'

export interface DeviceCardProps extends Omit<DeviceDTO, 'user'> {}

export const DeviceCard: React.FC<DeviceCardProps> = ({ name, lastActive }) => {
  const handleClick = async () => {
    await httpClient.get('/api/publish')
  }

  return (
    <Card
      className="device-card"
      title={name}
      extra={<MoreAction onDelete={() => console.log('wow')} />}
    >
      <div className="content">Last Active: {lastActive}</div>
      <br />
      <Button type="default" className="button" onClick={handleClick}>
        Alert
      </Button>
    </Card>
  )
}
