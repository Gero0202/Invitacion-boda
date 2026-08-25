'use client'

import { useState } from 'react'

import GuestFilters from './GuestFilters'
import GuestList from './GuestList'

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

interface GuestManagerProps {
  guests: Guest[]
}

export default function GuestManager({
  guests,
}: GuestManagerProps) {
  const [filteredGuests, setFilteredGuests] =
    useState<Guest[]>(guests)

  return (
    <section>
      <GuestFilters
        guests={guests}
        onFilter={setFilteredGuests}
      />

      <GuestList
        guests={filteredGuests}
      />
    </section>
  )
}