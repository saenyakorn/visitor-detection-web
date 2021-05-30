import { Menu, MenuProps, Row } from 'antd'
import { HomeOutlined, ContainerOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import './style.less'
import { AccountButton } from '../../atoms/AccountButton'
import Link from 'next/link'

export interface NavBarProps {
  href: string
}

export const NavBar: React.FC<NavBarProps> = ({ href }) => {
  const [selectItem, setSelectedItem] = useState('home')

  const changeSelectedItem: MenuProps['onClick'] = info => {
    setSelectedItem(info.key as string)
  }

  useEffect(() => {
    const menuKey = href === '/' ? 'home' : href.split('/')[1]
    setSelectedItem(menuKey)
  }, [setSelectedItem, href])

  return (
    <Row className="navbar-container">
      <Menu onClick={changeSelectedItem} selectedKeys={[selectItem]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link href="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="document" icon={<ContainerOutlined />}>
          <Link href="/document">Document</Link>
        </Menu.Item>
        <Menu.Item key="account" disabled>
          <AccountButton />
        </Menu.Item>
      </Menu>
    </Row>
  )
}
