'use server'

import { randomBytes } from 'crypto'
import { createClient } from '@/lib/supabase/server'

export async function createGuest(
  name: string,
  allowedGuests: number
) {
  const supabase = await createClient()

// Verificar que el usuario esté autenticado
  const { data: authData, error: claimsError } = await supabase.auth.getClaims()

  if (claimsError || !authData?.claims) {
    throw new Error('No autorizado')
  }

  // Generar token único
  const token = randomBytes(16).toString('hex')

  // Crear invitado
  const { data, error } = await supabase
    .from('guests')
    .insert({
      name,
      token,
      allowed_guests: allowedGuests,
    })
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error('No se pudo crear el invitado')
  }

  return data
}