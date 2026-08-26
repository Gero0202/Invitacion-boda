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

  // Validar token
  if (typeof token !== 'string') {
    throw new Error('Token de invitación inválido')
  }

  const cleanToken = token.trim()

  if (!cleanToken) {
    throw new Error('Token de invitación inválido')
  }

  // Los tokens generados tienen 32 caracteres hexadecimales
  if (!/^[a-f0-9]{32}$/i.test(cleanToken)) {
    throw new Error('Token de invitación inválido')
  }

  // Validar asistencia
  if (typeof attendance !== 'boolean') {
    throw new Error('Respuesta de asistencia inválida')
  }

  const { data, error } = await supabase.rpc(
    'save_rsvp',
    {
      guest_token: cleanToken,
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