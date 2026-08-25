'use client'

import { useState } from 'react'
import { deleteGuest } from '@/actions/guests'

interface DeleteGuestButtonProps {
  guestId: string
  guestName: string
}

export default function DeleteGuestButton({
  guestId,
  guestName,
}: DeleteGuestButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    const confirmed = window.confirm(
      `¿Seguro que querés eliminar la invitación de "${guestName}"?`
    )

    if (!confirmed) {
      return
    }

    try {
      setLoading(true)

      await deleteGuest(guestId)
    } catch (error) {
      console.error(error)

      alert(
        error instanceof Error
          ? error.message
          : 'No se pudo eliminar la invitación'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? 'Eliminando...' : 'Eliminar'}
    </button>
  )
}