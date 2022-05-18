import React, { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import validator from 'validator'
import styles from './PromptForm.module.scss'

const PromptForm: React.FC = () => {
  const PromptSchema = Yup.object().shape({
    promptText: Yup.string()
      .required('Required')
  })

  const formik = useFormik({
    initialValues: {
      promptText: ''
    },
    validationSchema: PromptSchema,
    onSubmit: (values) => {
      const { promptText } = values
      const userInput = validator.escape(promptText).trim()
      setSubmitting(true)
    },
  })

  const { isSubmitting, setSubmitting, errors, touched } = formik

  return (
    <div className={styles["form-container"]}>
      
    </div>
  )
}

export default PromptForm