import { createClient } from '@/lib/supabase/server'

export async function getGuestsWithRsvps() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('guests')
    .select(`
      id,
      name,
      token,
      created_at,
      rsvps (
        attendance,
        confirmed_at,
        updated_at
      )
    `)
    .order('created_at', {
      ascending: false,
    })

  if (error) {
    console.error(error)

    throw new Error(
      'No se pudieron cargar las invitaciones'
    )
  }

  return data.map((guest) => ({
    ...guest,
    rsvps: Array.isArray(guest.rsvps)
      ? guest.rsvps[0] ?? null
      : guest.rsvps ?? null,
  }))
}