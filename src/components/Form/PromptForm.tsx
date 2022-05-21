import React, { useRef } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import validator from 'validator'
import { useAppDispatch } from '../../state/hooks'
import { generateResponse } from '../../state/entities/interactions'
import styles from './PromptForm.module.scss'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'



const PromptForm = () => {
  const dispatch = useAppDispatch()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
        const sanitizedPrompt = validator.escape(values.promptText).trim()
        await dispatch(generateResponse({
          userPrompt: sanitizedPrompt
        }))
        
        setSubmitting(false)
        textareaRef.current!.value = ''
        resetForm()
      }}
    >
      {({ isSubmitting, errors, touched, handleChange }) => (
        <div className={styles["form-container"]}>
          <Form className={styles.form}>
            <label className={styles.label} htmlFor="promptText">
              Give Snappy a prompt...
            </label>
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
              disabled={isSubmitting}
            ></textarea>
            {errors.promptText && touched.promptText ? (
              <div className={styles.error}>{errors.promptText}</div>
            ) : null}
            <div className={styles["button-container"]}>
              <button
                className={styles["submit-button"]} 
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
              {isSubmitting && 
                <LoadingSpinner />
              }
            </div>
          </Form>
        </div>
      )} 
    </Formik>
  )
}

export default PromptForm