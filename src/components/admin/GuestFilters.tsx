'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import styles from "@/css/guestfilter.module.css"

interface Guest {
  id: string
  name: string
  token: string
  created_at: string
  rsvps: {
    attendance: boolean
    confirmed_at: string
    updated_at: string
  } | null
}

interface GuestFiltersProps {
  guests: Guest[]
  onFilter: (guests: Guest[]) => void
}

export default function GuestFilters({
  guests,
  onFilter,
}: GuestFiltersProps) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const filteredGuests = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase()

    return guests.filter((guest) => {
      const matchesSearch =
        guest.name
          .toLowerCase()
          .includes(normalizedSearch)

      if (!matchesSearch) {
        return false
      }

      let guestStatus = 'pending'

      if (guest.rsvps) {
        guestStatus =
          guest.rsvps.attendance
            ? 'confirmed'
            : 'declined'
      }

      if (
        status !== 'all' &&
        guestStatus !== status
      ) {
        return false
      }

      return true
    })
  }, [guests, search, status])

  useEffect(() => {
    onFilter(filteredGuests)
  }, [filteredGuests, onFilter])

  return (
  <section className={styles.filterSection}>
    <div className={styles.controlsRow}>
      <div className={styles.fieldGroup}>
        <label htmlFor="guest-search" className={styles.label}>
          Buscar invitación
        </label>

        <input
          id="guest-search"
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="guest-status" className={styles.label}>
          Estado
        </label>

        <select
          id="guest-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.select}
        >
          <option value="all">Todos</option>
          <option value="pending">Pendientes</option>
          <option value="confirmed">Confirmados</option>
          <option value="declined">No asisten</option>
        </select>
      </div>
    </div>

    <p className={styles.resultsCount}>
      Mostrando <strong>{filteredGuests.length}</strong> de{' '}
      <strong>{guests.length}</strong> invitaciones
    </p>
  </section>
)
}