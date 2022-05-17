import React from 'react'
import PromptForm from '../Form/PromptForm'
import InteractionList from '../InteractionList/InteractionList'
import styles from './Main.module.scss'


const Main = () => {
  return (
    <main className={styles.main}>
      <div className="container">
        <PromptForm />
      </div>
    </main>
  )
}

export default Main