import { httpClient } from '../../../config/http'
import { Input, Typography, Form, ModalProps, Modal } from 'antd'
import { ValidateStatus } from 'antd/lib/form/FormItem'
import Paragraph from 'antd/lib/typography/Paragraph'
import { ChangeEventHandler, useState } from 'react'
import { useData } from 'context'
import { DeviceDTO } from 'dto/devices'
import { format } from 'date-fns'
import { useSession } from 'next-auth/client'

export interface AddDeviceModalProps extends Exclude<ModalProps, 'title'> {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddDeviceModal: React.FC<AddDeviceModalProps> = ({ setVisible, ...props }) => {
  const [value, setValue] = useState('')
  const [token, setToken] = useState<string>()
  const [status, setStatus] = useState<ValidateStatus>('')
  const { deviceData, deviceMutate } = useData()
  const [session] = useSession()

  const handleOk = async () => {
    if (!token) {
      try {
        const { data } = await httpClient.post<{ token: string }>('/api/devices', {
          name: value,
          timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        })
        setToken(data.token)
        const newDevice: DeviceDTO = {
          user: session?.user?.email as string,
          name: value,
          lastActive: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        }
        deviceMutate(deviceData ? [...deviceData, newDevice] : [newDevice])
      } catch (err) {
        setStatus('error')
      }
    } else {
      setStatus('')
      setToken(undefined)
      setVisible(false)
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setStatus('')
    setValue(e.target.value)
  }

  const handleCancel = () => {
    setToken(undefined)
    setVisible(false)
  }

  return (
    <Modal title="Add a new device" onOk={handleOk} onCancel={handleCancel} {...props}>
      {!token ? (
        <Form>
          <Form.Item
            validateStatus={status}
            help={status === 'error' && 'The device name should be unique'}
          >
            <Input placeholder="Enter your device name" onChange={handleChange} />
          </Form.Item>
        </Form>
      ) : (
        <>
          <Typography.Title level={5}>Device Token</Typography.Title>
          <Paragraph copyable>{token}</Paragraph>
        </>
      )}
    </Modal>
  )
}
