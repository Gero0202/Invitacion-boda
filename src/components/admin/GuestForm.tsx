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
      await createGuest(name, allowedGuests)

      setName('')
      setAllowedGuests(1)

      onCreated?.()
    } catch {
      setError('No se pudo crear el invitado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.fieldGroup}>
        <label htmlFor="name" className={styles.label}>
          Nombre y apellido
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Juan Pérez"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="allowedGuests" className={styles.label}>
          Cantidad de personas
        </label>

        <input
          id="allowedGuests"
          type="number"
          min="1"
          value={allowedGuests}
          onChange={(e) => setAllowedGuests(Number(e.target.value))}
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