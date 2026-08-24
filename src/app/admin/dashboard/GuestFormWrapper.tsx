'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import GuestForm from '@/components/admin/GuestForm'


export default function GuestFormWrapper() {
  const router = useRouter()

  const handleCreated = () => {
    router.refresh()
  }

  return <GuestForm onCreated={handleCreated} />
}