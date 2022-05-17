import React, { useState, useEffect, useRef } from 'react'
import styles from './PromptForm.module.scss'

const PromptForm: React.FC = () => {
  const formContainerRef = useRef<HTMLDivElement>(null)

  const applyBackgroundUrl = () => {
    formContainerRef.current!.style.backgroundImage = 'url(/assets/robot.gif)';
  }

  useEffect(() => {
    applyBackgroundUrl()
  }, [])

  return (
    <div ref={formContainerRef} className={styles["form-container"]}>
      
    </div>
  )
}

export default PromptForm