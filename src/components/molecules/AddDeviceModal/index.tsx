import { Input, Typography } from 'antd'
import Modal, { ModalProps } from 'antd/lib/modal/Modal'
import { useRef, useState } from 'react'

export interface AddDeviceModalProps extends Exclude<ModalProps, 'title'> {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddDeviceModal: React.FC<AddDeviceModalProps> = ({ setVisible, ...props }) => {
  const inputRef = useRef<Input>(null)
  const [token, setToken] = useState<string>()

  const handleOk = () => {
    if (!token) setToken('token')
    else {
      // add new device to server
      setToken(undefined)
      setVisible(false)
    }
  }

  const handleCancel = () => {
    setToken(undefined)
    setVisible(false)
  }

  return (
    <Modal title="Add a new device" onOk={handleOk} onCancel={handleCancel} {...props}>
      {!token ? (
        <Input ref={inputRef} placeholder="Enter your device name" />
      ) : (
        <>
          <Typography.Title level={5}>Device Token</Typography.Title>
          <Typography.Text>{token}</Typography.Text>
        </>
      )}
    </Modal>
  )
}
