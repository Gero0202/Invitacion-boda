'use client'

import React, { useState, useTransition } from 'react'
import { createGuest } from '@/actions/guests'
import styles from '@/css/guestform.module.css'

interface GuestFormProps {
  onCreated?: () => void
}

export default function GuestForm({ onCreated }: GuestFormProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!name.trim()) return

    startTransition(async () => {
      try {
        await createGuest(name)
        setName('')
        
        // Ejecutamos la actualización dentro del mismo bloque de transición
        if (onCreated) {
          onCreated()
        }
      } catch {
        setError('No se pudo crear la invitación')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.fieldGroup}>
        <label htmlFor="name" className={styles.label}>
          Invitación para
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
        disabled={isPending}
        className={styles.submitButton}
      >
        {isPending ? 'Creando...' : 'Crear invitado'}
      </button>
    </form>
  )
}