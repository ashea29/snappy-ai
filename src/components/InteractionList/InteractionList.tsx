import React, { useRef } from 'react'
import InteractionCard from '../InteractionCard/InteractionCard'
import { useAppSelector } from '../../state/hooks'
import { selectInteractions } from '../../state/entities/interactions'
import styles from './InteractionList.module.scss'


const InteractionList = () => {
  const interactions = useAppSelector(selectInteractions)

  return (
    <div className={styles["interaction-list"]}>
      {interactions.map((interaction, index) => (
        <InteractionCard
          key={interaction.id} 
          userPrompt={interaction.prompt}
          response={interaction.response}
        />
      ))}
    </div>
  )
}

export default InteractionList