import { Button, Row, Space, Typography } from 'antd'
import { signIn } from 'next-auth/client'
import Link from 'next/link'
require('./style.less')

const { Title, Text } = Typography

export interface GettingStartProps {}

export const GettingStart: React.FC<GettingStartProps> = () => {
  return (
    <>
      <Row className="getting-start-container">
        <Space size="small" direction="vertical" align="center">
          <Title level={1} className="title">
            Visitor Detection
          </Title>
          <Text type="secondary" className="text">
            Detect someone enter your house
          </Text>
          <Space size="large" className="button-group">
            <Button type="primary" onClick={() => signIn('google')}>
              Getting Start
            </Button>
            <Link href="/document">
              <Button>Documentation</Button>
            </Link>
          </Space>
        </Space>
      </Row>
    </>
  )
}
