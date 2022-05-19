import React, { useEffect, useRef } from 'react'
import InteractionCard from '../InteractionCard/InteractionCard'
import { useAppSelector } from '../../state/hooks'
import { selectInteractions } from '../../state/entities/interactions'
import styles from './InteractionList.module.scss'


const InteractionList = () => {
  const interactions = useAppSelector(selectInteractions)
  const buttonRef = useRef<HTMLDivElement>(null)
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    interactions.length === 0 ? 
      buttonRef.current!.style.display = "none"
      : 
      buttonRef.current!.style.display = "block"

  }, [interactions])

  return (
    <div className={styles["interaction-list"]}>
      {interactions.map((interaction, index) => (
        <InteractionCard
          key={interaction.id} 
          userPrompt={interaction.prompt}
          response={interaction.response}
        />
      ))}
        <div ref={buttonRef} className={styles["button-container"]}>
          <button 
            className={styles["to-top-button"]}
            onClick={handleClick}
          >
            BACK TO TOP
          </button>
        </div>
    </div>
  )
}

export default InteractionList