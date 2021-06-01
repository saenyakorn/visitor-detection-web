import { MoreAction } from '../../atoms'
import { httpClient } from '../../../config/http'
import { DeviceDTO } from '../../../dto/devices'
import { Button, Card } from 'antd'
import { useData } from '../../../context'
require('./style.less')

export interface DeviceCardProps extends Omit<DeviceDTO, 'user'> {}

export const DeviceCard: React.FC<DeviceCardProps> = ({ _id, name, lastActive }) => {
  const { deviceData, deviceMutate } = useData()
  const handleClick = async () => {
    await httpClient.get('/api/publish')
  }

  const onDelete = () => {
    if (_id) {
      httpClient.delete(`/api/devices?id=${_id}`)
      deviceMutate(deviceData?.filter(value => value._id != _id))
    }
  }

  return (
    <Card className="device-card" title={name} extra={<MoreAction onDelete={onDelete} />}>
      <div className="content">Last Active: {lastActive}</div>
      <br />
      <Button type="default" className="button" onClick={handleClick}>
        Alert
      </Button>
    </Card>
  )
}
