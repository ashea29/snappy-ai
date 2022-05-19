import React from 'react'
import PromptForm from '../Form/PromptForm'
import InteractionList from '../InteractionList/InteractionList'
import Robot from '../RobotGIF/Robot'
import styles from './Main.module.scss'


const Main = () => {
  return (
    <div className="container">
      <main className={styles.main}>
        <section className={styles["form-section"]}>
          <PromptForm />
          <Robot />
        </section>
        <section className={styles["list-section"]}>
          <InteractionList />
        </section>
      </main>
    </div>
  )
}

export default Main