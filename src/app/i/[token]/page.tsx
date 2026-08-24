import { notFound } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

interface InvitationPageProps {
  params: Promise<{
    token: string
  }>
}

export default async function InvitationPage({
  params,
}: InvitationPageProps) {
  const { token } = await params

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
      <h1>
        Invitación de boda
      </h1>

      <h2>
        {guest.name}
      </h2>

      <p>
        Tenemos el placer de invitarte a
        compartir este día con nosotros.
      </p>

      <p>
        Invitación para{' '}
        {guest.allowed_guests}{' '}
        {guest.allowed_guests === 1
          ? 'persona'
          : 'personas'}
      </p>
    </main>
  )
}