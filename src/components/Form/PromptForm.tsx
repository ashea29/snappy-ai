import React, { useEffect, useRef } from 'react'
import { Form, Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import validator from 'validator'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { generateResponse, selectInteractionsLoading } from '../../state/entities/interactions'
import styles from './PromptForm.module.scss'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'



const PromptForm = () => {
  const dispatch = useAppDispatch()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  const interactionsLoading = useAppSelector(selectInteractionsLoading)

  const PromptSchema = Yup.object().shape({
    promptText: Yup.string()
      .required('Required')
  })

  return (
    <Formik
      initialValues={{
        promptText: ''
      }}
      validationSchema={PromptSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        // submitButtonRef.current!.disabled = true
        const sanitizedPrompt = validator.escape(values.promptText).trim()
        console.log(values.promptText)
        const response = await dispatch(generateResponse({
          userPrompt: sanitizedPrompt
        }))
        
        // setSubmitting(false)
        // submitButtonRef.current!.disabled = false
        console.log(response)
        textareaRef.current!.value = ''
        resetForm()
      }}
    >
      {({ values, isSubmitting, errors, touched, handleChange }) => (
        <div className={styles["form-container"]}>
          <Form className={styles.form}>
            <label className={styles.label} htmlFor="promptText">Ask Snappy a Question...</label>
            <textarea
              ref={textareaRef}
              className={styles["prompt-input"]} 
              name="promptText" 
              id="promptText" 
              cols={30} 
              rows={7}
              wrap="hard"
              placeholder="Write prompt here"
              onChange={handleChange}
            ></textarea>
            {errors.promptText && touched.promptText ? (
              <div className={styles.error}>{errors.promptText}</div>
            ) : null}
            <button
              ref={submitButtonRef}
              className={styles["submit-button"]} 
              type="submit"
              // disabled={isSubmitting}
            >
              Submit
            </button> 
          </Form>
        </div>
      )} 

    </Formik>
  )
}

export default PromptForm