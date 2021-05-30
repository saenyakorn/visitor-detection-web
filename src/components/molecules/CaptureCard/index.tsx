import { MoreAction } from '@app/components/atoms'
import { CaptureDTO } from '@app/dto/capture'
import { Card, Image } from 'antd'
import './style.less'

export interface CaptureCardProps extends CaptureDTO {}

export const CaptureCard: React.FC<CaptureCardProps> = ({ name, imageURL, createdDate }) => {
  return (
    <Card
      className="capture-card"
      title={name}
      cover={<Image src={imageURL} />}
      extra={<MoreAction onDelete={() => console.log('wow')} />}
    >
      <div className="content">Time: {createdDate}</div>
    </Card>
  )
}
