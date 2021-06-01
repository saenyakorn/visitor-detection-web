import { PlusOutlined } from '@ant-design/icons'
import { AddDeviceModal } from '../../molecules/AddDeviceModal'
import { Capture } from '../../organisims/Capture'
import { Device } from '../../organisims/Device'
import { Button, Space, Typography } from 'antd'
import { useState } from 'react'
require('./style.less')
export interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const [visible, setVisible] = useState(false)
  const showModal = () => {
    setVisible(true)
  }

  return (
    <>
      <Space className="dashboard-container" size="large" direction="vertical">
        <Space size="large" direction="vertical" className="width100">
          <Space size="large" className="width100">
            <Typography.Title level={5}>Devices</Typography.Title>
            <Button type="link" onClick={showModal}>
              <PlusOutlined /> add device
            </Button>
          </Space>
          <Device />
        </Space>
        <Space direction="vertical" className="width100">
          <Typography.Title level={5}>Capture Images</Typography.Title>
          <Capture />
        </Space>
      </Space>
      <AddDeviceModal visible={visible} setVisible={setVisible} />
    </>
  )
}
