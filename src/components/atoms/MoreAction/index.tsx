import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
require('./style.less')

export interface MoreActionProps {
  onDelete: () => void
}

export const MoreAction: React.FC<MoreActionProps> = ({ onDelete }) => {
  const menu = (
    <Menu onClick={onDelete}>
      <Menu.Item key="1" icon={<DeleteOutlined />}>
        delete
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <EllipsisOutlined className="more-action" />
    </Dropdown>
  )
}
