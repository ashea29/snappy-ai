import React, { useEffect, useRef } from 'react'
import styles from './Robot.module.scss'


const Robot = () => {
  const robotContainerRef = useRef<HTMLDivElement>(null)

  const applyBackgroundUrl = () => {
    robotContainerRef.current!.style.backgroundImage = 'url(/assets/robot.gif)';
  }

  useEffect(() => {
    applyBackgroundUrl()
  }, [])
  
  return (
    <div ref={robotContainerRef} className={styles["robot-container"]}></div>
  )
}

export default Robot