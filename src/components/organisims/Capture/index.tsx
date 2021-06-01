import { Error, Loading } from '../../atoms'
import { CaptureCard } from '../../molecules/CaptureCard'
import { Row, Col } from 'antd'
import { useData } from 'context'
require('./style.less')

export interface CaptureProps {}

export const Capture: React.FC<CaptureProps> = () => {
  const { captureData, captureError } = useData()

  if (captureError) return <Error />
  if (!captureData) return <Loading />

  return (
    <Row gutter={[16, 16]} className="capture">
      {captureData
        .sort(({ timestamp: A }, { timestamp: B }) => (A > B ? -1 : 1))
        .map(item => (
          <Col sm={12} md={8} lg={6} className="gutter-row" key={item._id}>
            <CaptureCard {...item} />
          </Col>
        ))}
    </Row>
  )
}
