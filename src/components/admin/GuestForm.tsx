'use client'

import React, { useState } from 'react'
import { createGuest } from '@/actions/guests'
import styles from '@/css/guestform.module.css'

interface GuestFormProps {
  onCreated?: () => void
}

export default function GuestForm({ onCreated }: GuestFormProps) {
  const [name, setName] = useState('')
  const [allowedGuests, setAllowedGuests] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      await createGuest(name)

      setName('')
      

      onCreated?.()
    } catch {
      setError('No se pudo crear la invitacion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.fieldGroup}>
        <label htmlFor="name" className={styles.label}>
          Invitacion para
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Juan y Carolina"
          className={styles.input}
          required
        />
      </div>


      {error && <p className={styles.errorMessage}>{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={styles.submitButton}
      >
        {loading ? 'Creando...' : 'Crear invitado'}
      </button>
    </form>
  )
}