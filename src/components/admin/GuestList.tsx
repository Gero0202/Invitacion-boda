'use client'

import React, { useState } from 'react'
import styles from '@/css/guestlist.module.css'
interface Guest {
  id: string
  name: string
  token: string
  allowed_guests: number
}

interface GuestListProps {
  guests: Guest[]
}

export default function GuestList({ guests }: GuestListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  function copyLink(guestId: string, token: string) {
    const url = `${window.location.origin}/i/${token}`

    navigator.clipboard.writeText(url)
    setCopiedId(guestId)

    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  if (guests.length === 0) {
    return (
      <p className={styles.emptyState}>
        Todavía no hay invitados registrados.
      </p>
    )
  }

  return (
    <div className={styles.container}>
      {guests.map((guest) => {
        const url = `${window.location.origin}/i/${guest.token}`
        const isCopied = copiedId === guest.id

        return (
          <div key={guest.id} className={styles.card}>
            <div className={styles.header}>
              <h3 className={styles.title}>{guest.name}</h3>

              <span className={styles.badge}>
                {guest.allowed_guests}{' '}
                {guest.allowed_guests === 1 ? 'persona' : 'personas'}
              </span>
            </div>

            <div className={styles.linkGroup}>
              <span className={styles.urlText}>{url}</span>

              <button
                onClick={() => copyLink(guest.id, guest.token)}
                className={`${styles.copyButton} ${
                  isCopied ? styles.copiedButton : ''
                }`}
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