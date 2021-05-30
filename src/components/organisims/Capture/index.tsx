import { Error, Loading } from '@app/components/atoms'
import { CaptureCard } from '@app/components/molecules/CaptureCard'
import { CaptureDTO } from '@app/dto/capture'
import { Row, Col } from 'antd'
import axios from 'axios'
import useSWR from 'swr'
import './style.less'

export interface CaptureProps {}

const fetcher = () => axios.get<CaptureDTO[]>('/api/captures').then(result => result.data)

export const Capture: React.FC<CaptureProps> = () => {
  const { data, error } = useSWR('/api/captures', fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  return (
    <Row gutter={[16, 16]} className="capture">
      {data.map((item, index) => (
        <Col sm={12} md={8} lg={6} className="gutter-row" key={`capture-${index}`}>
          <CaptureCard {...item} />
        </Col>
      ))}
    </Row>
  )
}
