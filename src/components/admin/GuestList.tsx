'use client'

import { useState, useEffect } from 'react'
import styles from '@/css/guestlist.module.css'

interface RsvpData {
  attendance: boolean | string | number
  confirmed_at?: string
  created_at?: string
  updated_at?: string
}

interface Guest {
  id: string
  name: string
  token: string
  created_at: string
  rsvps?: RsvpData[] | RsvpData | null
}

interface GuestListProps {
  guests: Guest[]
}

export default function GuestList({ guests = [] }: GuestListProps) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null)
  const [origin, setOrigin] = useState<string>('')

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  function copyLink(token: string) {
    const url = `${origin}/i/${token}`
    navigator.clipboard.writeText(url)
    setCopiedToken(token)

    setTimeout(() => {
      setCopiedToken(null)
    }, 2000)
  }

  // Extrae de forma segura el objeto RSVP sin importar si Supabase devolvió un Array o un Object
  function getRsvpRecord(rsvps: Guest['rsvps']): RsvpData | null {
    if (!rsvps) return null
    if (Array.isArray(rsvps)) {
      return rsvps.length > 0 ? rsvps[0] : null
    }
    return rsvps
  }

  if (guests.length === 0) {
    return (
      <p className={styles.emptyState}>
        Todavía no hay invitaciones cargadas.
      </p>
    )
  }

  return (
    <div className={styles.container}>
      {guests.map((guest) => {
        const url = origin ? `${origin}/i/${guest.token}` : `/i/${guest.token}`

        const rsvpRecord = getRsvpRecord(guest.rsvps)
        const hasRsvp = rsvpRecord !== null

        // Coerción explicita para manejar booleans, 1/0 o strings "true"/"false"
        const isConfirmed =
          hasRsvp &&
          (rsvpRecord.attendance === true ||
            rsvpRecord.attendance === 'true' ||
            rsvpRecord.attendance === 1)

        const statusLabel = !hasRsvp
          ? 'Pendiente'
          : isConfirmed
            ? 'Confirmado'
            : 'No asiste'

        const statusClass = !hasRsvp
          ? styles.statusPending
          : isConfirmed
            ? styles.statusConfirmed
            : styles.statusDeclined

        const rawDate = rsvpRecord?.confirmed_at || rsvpRecord?.created_at || rsvpRecord?.updated_at
        const formattedDate = rawDate
          ? new Date(rawDate).toLocaleDateString('es-AR')
          : null

        const isCopied = copiedToken === guest.token

        return (
          <div key={guest.id} className={styles.card}>
            <div className={styles.header}>
              <h3 className={styles.name}>{guest.name}</h3>

              <span className={`${styles.badge} ${statusClass}`}>
                {statusLabel}
              </span>
            </div>

            {hasRsvp && formattedDate && (
              <p className={styles.details}>
                Respondió: {formattedDate}
              </p>
            )}

            <div className={styles.linkSection}>
              <p className={styles.urlText}>{url}</p>

              <button
                type="button"
                className={`${styles.copyButton} ${
                  isCopied ? styles.copyButtonCopied : ''
                }`}
                onClick={() => copyLink(guest.token)}
              >
                {isCopied ? '¡Copiado!' : 'Copiar link'}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}