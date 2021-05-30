import { signIn, signOut, useSession } from 'next-auth/client'
import { Button, ButtonProps } from 'antd'

export interface AccountButtonProps extends Exclude<ButtonProps, 'onClick'> {}

const AccountButton: React.FC<AccountButtonProps> = props => {
  const [session] = useSession()

  if (!session) {
    return (
      <Button onClick={() => signIn('google')} {...props}>
        Log in
      </Button>
    )
  }

  return (
    <Button onClick={() => signOut()} {...props}>
      Log out
    </Button>
  )
}

export { AccountButton }
