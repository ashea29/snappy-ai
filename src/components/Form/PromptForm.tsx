import React, { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import validator from 'validator'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { generateResponse, selectInteractions } from '../../state/entities/interactions'
import styles from './PromptForm.module.scss'



const PromptForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const formContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const applyBackgroundUrl = () => {
    formContainerRef.current!.style.backgroundImage = 'url(/assets/robot.gif)';
  }

  useEffect(() => {
    applyBackgroundUrl()
  }, [])

  const PromptSchema = Yup.object().shape({
    promptText: Yup.string()
      .required('Required')
  })
  
  const formik = useFormik({
    initialValues: {
      promptText: ''
    },
    validationSchema: PromptSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const sanitizedPrompt = validator.escape(values.promptText).trim()
      console.log(values.promptText)
      setSubmitting(true)
      const response = await dispatch(generateResponse({
        userPrompt: sanitizedPrompt
      }))
      console.log(response)
      setSubmitting(false)
      textareaRef.current!.value = ''
      resetForm({
        values: {
          promptText: ''
        }
      })
    },
  })

  const { isSubmitting, errors, touched } = formik

  return (
    <div ref={formContainerRef} className={styles["form-container"]}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
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
          onChange={formik.handleChange}
        ></textarea>
        {errors.promptText && touched.promptText ? (
          <div>{errors.promptText}</div>
        ) : null}
        <button className={styles["submit-button"]} type="submit">Submit</button>
      </form>
    </div>
  )
}

export default PromptForm