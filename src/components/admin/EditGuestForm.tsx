'use client'

import { useState } from 'react'
import { updateGuest } from '@/actions/guests'
import styles from '@/css/editguestform.module.css'

interface EditGuestFormProps {
  guestId: string
  initialName: string
  onCancel: () => void
  onSuccess: () => void
}

export default function EditGuestForm({
  guestId,
  initialName,
  onCancel,
  onSuccess,
}: EditGuestFormProps) {
  const [name, setName] = useState(initialName)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleAction() {
    setError('')

    if (!name.trim()) {
      setError('El nombre de la invitación es obligatorio')
      return
    }

    try {
      setLoading(true)
      await updateGuest(guestId, name)
      onSuccess()
    } catch (err) {
      console.error(err)
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo actualizar la invitación'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={handleAction} className={styles.editForm}>
      <div className={styles.inputGroup}>
        <label htmlFor={`edit-${guestId}`} className={styles.label}>
          Nombre de la invitación
        </label>

        <input
          id={`edit-${guestId}`}
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>

      {error && <p className={styles.errorText}>{error}</p>}

      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  )
}