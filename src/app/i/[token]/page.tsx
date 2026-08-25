import { notFound } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import Hero from '@/components/wedding/Hero'
import Story from '@/components/wedding/Story'
import EventDetails from '@/components/wedding/EventDetails'
import Location from '@/components/wedding/Location'
import Countdown from '@/components/wedding/Countdown'
import DressCode from '@/components/wedding/DressCode'
import GiftRegistry from '@/components/wedding/GiftRegistry'
import FAQ from '@/components/wedding/Faq'
import Footer from '@/components/wedding/Footer'
import RsvpForm from '@/components/invitation/RsvpForm'

interface PageProps {
  params: Promise<{
    token: string
  }>
}

export default async function GuestTokenPage({ params }: PageProps) {
  // 1. Obtener el token de la URL
  const { token } = await params;

  const supabase = await createClient()

  const { data, error } = await supabase.rpc(
    'get_guest_by_token',
    {
      guest_token: token,
    }
  )

  if (error) {
    console.error(error)
    throw new Error('No se pudo cargar la invitación')
  }

  const guest = data?.[0]

  if (!guest) {
    notFound()
  }

  return (
    <main>
      <Hero guestName={guest.name} />
      <Story />
      <EventDetails />
      <Location />
      <Countdown />
      <DressCode />
      <RsvpForm token={token}/>
      <GiftRegistry />
      <FAQ />
      <Footer />
    </main>
  )
}