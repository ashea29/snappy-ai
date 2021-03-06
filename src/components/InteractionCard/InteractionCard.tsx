import React, { useEffect, useRef } from 'react'
import styles from './InteractionCard.module.scss'


interface InteractionProps {
  userPrompt: string,
  response: string
}

const InteractionCard = (props: InteractionProps) => {
  const { userPrompt, response } = props
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    cardRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }, [])

  return (
    <div ref={cardRef}>
      <div className={styles.card}>
        <div className={styles["prompt-container"]}>
          <div className={styles["prompt-name"]}>
            <h4>Me:</h4>
          </div>
          <div className={styles["prompt-text"]}>
            {userPrompt}
          </div>
        </div>
        <div className={styles["response-container"]}>
          <div className={styles["response-name"]}>
            <h4>Snappy:</h4>
          </div>
          <div className={styles["response-text"]}>
            {response}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractionCard