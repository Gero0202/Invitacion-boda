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
      <section className={styles.container}>
        <div className={styles.successCard}>
          <div className={styles.successBadge}>✓ Confirmado</div>
          <h3 className={styles.successTitle}>¡Gracias por confirmar!</h3>
          <p className={styles.successMessage}>
            Tu respuesta fue registrada correctamente.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Confirmación de asistencia</span>
          <h2 className={styles.title}>¿Nos acompañás?</h2>
        </div>

        <div className={styles.optionsContainer}>
          <button
            type="button"
            onClick={() => setAttendance(true)}
            className={`${styles.optionButton} ${
              attendance === true ? styles.selectedYes : ''
            }`}
          >
            Sí, ¡ahí estaré!
          </button>

          <button
            type="button"
            onClick={() => setAttendance(false)}
            className={`${styles.optionButton} ${
              attendance === false ? styles.selectedNo : ''
            }`}
          >
            No podré asistir
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
    </section>
  )
}