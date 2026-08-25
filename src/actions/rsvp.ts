'use server'

import { createClient } from '@/lib/supabase/server'

interface SaveRsvpData {
  token: string
  attendance: boolean
}

export async function saveRsvp({
  token,
  attendance,
}: SaveRsvpData) {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc(
    'save_rsvp',
    {
      guest_token: token,
      guest_attendance: attendance,
    }
  )

  if (error) {
    console.error(error)

    throw new Error(
      'No se pudo guardar la confirmación'
    )
  }

  return data
}