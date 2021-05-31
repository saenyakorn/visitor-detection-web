import { PlusOutlined } from '@ant-design/icons'
import { AddDeviceModal } from '@app/components/molecules/AddDeviceModal'
import { Capture } from '@app/components/organisims/Capture'
import { Device } from '@app/components/organisims/Device'
import { httpClient } from '@app/config/http'
import { Button, Image, Space, Typography } from 'antd'
import { ChangeEventHandler, useRef, useState } from 'react'
import './style.less'
export interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const [visible, setVisible] = useState(false)
  const [image, setImage] = useState<{ preview: string; raw: File | null }>({
    preview: '',
    raw: null,
  })

  const showModal = () => {
    setVisible(true)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = async event => {
    if (event?.target?.files?.length) {
      setImage({
        preview: URL.createObjectURL(event.target.files[0]),
        raw: event.target.files[0],
      })
      const image = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = async () => {
        await httpClient.post('/api/upload', {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic2FuZXlha29ybkBnbWFpbC5jb20iLCJkZXZpY2VOYW1lIjoiZnJvbnQiLCJpYXQiOjE2MjI0NzM1NDR9.k5iA03uj3oDnwl6-uIb9X2huUr4CpxhIl31xZfh0JYE',
          image: reader.result,
        })
      }
    }
  }

  return (
    <>
      <input
        ref={hiddenFileInput}
        onChange={handleChange}
        type="file"
        style={{ display: 'none' }}
        accept="image/jpeg"
      />
      <button onClick={() => hiddenFileInput?.current?.click()}>Upload File</button>
      {image.preview && <Image src={image.preview} width={300} />}
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
