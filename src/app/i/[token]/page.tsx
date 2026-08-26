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
import Reveal from '@/components/ui/Reveal'

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
      <Reveal>
        <Hero guestName={guest.name} />
      </Reveal>

      <Reveal>
        <Story />
      </Reveal>

      <Reveal>
        <DressCode />
      </Reveal>

      {/* Lugar y como llegar */}
      <Reveal>
        <EventDetails />
      </Reveal>

      <Reveal>
        <Location
          address="Av. 44, C. 115 &, B1900 La Plata, Provincia de Buenos Aires"
          googleMapsUrl="https://maps.app.goo.gl/1TBWqsc2SrPVJc88A"
          embedMapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1353.8703449358482!2d-57.94638220088954!3d-34.90274719999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e7fdb37d43cf%3A0x94184f128429c657!2sJano's%20Hip%C3%B3dromo%20de%20La%20Plata!5e0!3m2!1ses-419!2sar!4v1787765032720!5m2!1ses-419!2sar"
        />
      </Reveal>

      <Reveal>
        <Countdown />
      </Reveal>

      <Reveal>
        <RsvpForm token={token} />
      </Reveal>

      <Reveal>
        <GiftRegistry />
      </Reveal>

      <Reveal>
        <FAQ />
      </Reveal>

      <Reveal>
        <Footer />
      </Reveal>
    </main>
  )
}