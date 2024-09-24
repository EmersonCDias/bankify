import React from 'react'
import Image from 'next/image'
import { logoutAccount } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const Footer = () => {
  const router = useRouter()

  const handleLogout = async () => {
    const loggedOut = await logoutAccount()

    if (loggedOut) {
      router.push('/sign-in')
    }
  }

  return (
    <footer className="footer">
      <Button
        onClick={() => handleLogout()}
        variant="ghost"
        className="plaidlink-default relative"
      >
        <Image src="icons/logout.svg" width={24} height={24} alt="logout" />

        <p className="hiddenl text-[16px] font-semibold text-black-2 xl:block">
          Logout
        </p>
      </Button>
    </footer>
  )
}

export default Footer
