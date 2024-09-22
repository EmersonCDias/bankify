import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import RecentTransactions from '@/components/RecentTransactions'

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentUser = Number(page as string) || 1

  const loggedIn = await getLoggedInUser()
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  })

  if (!accounts) return

  const accountsData = accounts?.data
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId

  const account = await getAccount({ appwriteItemId })

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage you account your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentUser}
        />
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 3458.13 }, { currentBalance: 500 }]}
      />
    </section>
  )
}

export default Home
