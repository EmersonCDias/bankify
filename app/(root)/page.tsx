import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'
import RightSidebar from '@/components/RightSidebar'
import { randomUUID } from 'crypto'
import { getLoggedInUser } from '@/lib/actions/user.actions'

const Home = async () => {
  const loggedIn = await getLoggedInUser()

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-content">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn.name || 'Guest'}
            subtext="Access and manage you account your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
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
