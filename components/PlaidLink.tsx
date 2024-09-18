import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from 'react-plaid-link'
import {
  createLinkToken,
  exchangePublicToken,
} from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter()

  const [token, setToken] = useState('')

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (publicToken: string) => {
      await exchangePublicToken({
        publicToken,
        user,
      })

      router.push('/')
    },
    [user]
  )

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  }

  const { open, ready } = usePlaidLink(config)

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user)

      setToken(data?.linkToken)
    }

    getLinkToken()
  }, [])

  return (
    <>
      {variant === 'primary' ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect bank
        </Button>
      ) : variant === 'ghost' ? (
        <Button>Connect bank</Button>
      ) : (
        <Button>Connect bank</Button>
      )}
    </>
  )
}

export default PlaidLink
