import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'
import RightSidebar from '@/components/RightSidebar'

const Home = () => {
  const loggedIn = {
    firstName: 'Emerson',
    lastName: 'Dias',
    email: 'email@email.com',
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-content">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
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

      <RightSidebar user={loggedIn} transactions={[]} banks={[{}, {}]} />
    </section>
  )
}

export default Home
