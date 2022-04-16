import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bulma/css/bulma.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ether Lottery</title>
        <meta name="description" content="Ether Lottery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <nav className='navbar'>
          <div className='container'>
            <div className='navbar-brand'>
              <h1>Ether lottery</h1>
            </div>
            <div className='navbar-end'>
              
            </div>
          </div>
        </nav>
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}
