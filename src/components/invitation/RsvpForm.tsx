'use client'

import React, { useState } from 'react'
import { saveRsvp } from '@/actions/rsvp'
import styles from '@/css/RsvpForm.module.css'

interface RsvpFormProps {
  token: string
}

export default function RsvpForm({ token }: RsvpFormProps) {
  const [attendance, setAttendance] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (attendance === null) {
      setError('Por favor, indicá si vas a asistir.')
      return
    }

    setError('')
    setLoading(true)

    try {
      await saveRsvp({
        token,
        attendance,
      })

      setSuccess(true)
    } catch (err) {
      console.error(err)
      setError('No se pudo guardar la confirmación.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className={styles.successCard}>
        <h3 className={styles.successTitle}>¡Gracias por confirmar!</h3>
        <p className={styles.successMessage}>
          Tu respuesta fue registrada correctamente.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
      <h2 className={styles.title}>¿Nos acompañan?</h2>

      <div className={styles.optionsContainer}>
        <button
          type="button"
          onClick={() => setAttendance(true)}
          className={`${styles.optionButton} ${
            attendance === true ? styles.selectedYes : ''
          }`}
        >
          Sí, vamos
        </button>

        <button
          type="button"
          onClick={() => setAttendance(false)}
          className={`${styles.optionButton} ${
            attendance === false ? styles.selectedNo : ''
          }`}
        >
          No podremos asistir
        </button>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={styles.submitButton}
      >
        {loading ? 'Guardando...' : 'Confirmar respuesta'}
      </button>
    </form>
  )
}