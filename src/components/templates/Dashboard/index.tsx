import { PlusOutlined } from '@ant-design/icons'
import { AddDeviceModal } from '@app/components/molecules/AddDeviceModal'
import { Capture } from '@app/components/organisims/Capture'
import { Device } from '@app/components/organisims/Device'
import { Button, Space, Typography } from 'antd'
import { useState } from 'react'
import './style.less'

export interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  return (
    <>
      <Space className="dashboard-container" size="large" direction="vertical">
        <Space direction="vertical">
          <Typography.Title level={5}>Capture Images</Typography.Title>
          <Capture />
        </Space>
        <Space size="large" direction="vertical">
          <Space size="large">
            <Typography.Title level={5}>Devices</Typography.Title>
            <Button type="link" onClick={showModal}>
              <PlusOutlined /> add device
            </Button>
          </Space>
          <Device />
        </Space>
      </Space>
      <AddDeviceModal visible={visible} setVisible={setVisible} />
    </>
  )
}
