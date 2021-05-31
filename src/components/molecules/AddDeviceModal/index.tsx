import { httpClient } from '@app/config/http'
import { Input, Typography, Form } from 'antd'
import { ValidateStatus } from 'antd/lib/form/FormItem'
import Modal, { ModalProps } from 'antd/lib/modal/Modal'
import Paragraph from 'antd/lib/typography/Paragraph'
import { ChangeEventHandler, useState } from 'react'

export interface AddDeviceModalProps extends Exclude<ModalProps, 'title'> {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddDeviceModal: React.FC<AddDeviceModalProps> = ({ setVisible, ...props }) => {
  const [value, setValue] = useState('')
  const [token, setToken] = useState<string>()
  const [status, setStatus] = useState<ValidateStatus>('')

  const handleOk = async () => {
    if (!token) {
      try {
        const { data } = await httpClient.post<{ token: string }>('/api/devices', {
          name: value,
        })
        setToken(data.token)
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
