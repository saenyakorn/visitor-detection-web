import { MoreAction } from '@app/components/atoms'
import { CaptureDTO } from '@app/dto/capture'
import { Card, Image } from 'antd'
import './style.less'

export interface CaptureCardProps extends Omit<CaptureDTO, 'user'> {}

export const CaptureCard: React.FC<CaptureCardProps> = ({ deviceName, image, timestamp }) => {
  return (
    <Card
      className="capture-card"
      title={deviceName}
      cover={<Image src={image} />}
      extra={<MoreAction onDelete={() => console.log('wow')} />}
    >
      <div className="content">Time: {timestamp}</div>
    </Card>
  )
}
