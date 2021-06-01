import { Card, Image } from 'antd'
import { MoreAction } from '../../atoms'
import { CaptureDTO } from '../../../dto/capture'
import { httpClient } from '../../../config/http'
import { useData } from '../../../context'
require('./style.less')

export interface CaptureCardProps extends Omit<CaptureDTO, 'user'> {}

export const CaptureCard: React.FC<CaptureCardProps> = ({ _id, deviceName, image, timestamp }) => {
  const { captureData, captureMutate } = useData()

  const onDelete = () => {
    if (_id) {
      httpClient.delete(`/api/captures?id=${_id}`)
      captureMutate(
        captureData?.filter(value => value._id != _id),
        false,
      )
    }
  }

  return (
    <Card
      className="capture-card"
      title={deviceName}
      cover={<Image src={image} />}
      extra={<MoreAction onDelete={onDelete} />}
    >
      <div className="content">Time: {timestamp}</div>
    </Card>
  )
}
