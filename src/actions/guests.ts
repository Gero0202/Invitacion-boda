'use server'

import { randomBytes } from 'crypto'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/admin'

export async function createGuest(
  name: string
) {

  await requireAdmin()
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
    })
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error('No se pudo crear la invitacion')
  }

  return data
}

export async function updateGuest(
  guestId: string,
  name: string
) {
  await requireAdmin()
  const supabase = await createClient()

  const cleanName = name.trim()

  if (!guestId) {
    throw new Error('ID de invitación inválido')
  }

  if (!cleanName) {
    throw new Error(
      'El nombre de la invitación es obligatorio'
    )
  }

  const { error } = await supabase
    .from('guests')
    .update({
      name: cleanName,
    })
    .eq('id', guestId)

  if (error) {
    console.error(error)

    throw new Error(
      'No se pudo actualizar la invitación'
    )
  }

  revalidatePath('/admin/dashboard')

  return {
    success: true,
  }
}

export async function deleteGuest(
  guestId: string
) {
  await requireAdmin()
  const supabase = await createClient()

  if (!guestId) {
    throw new Error(
      'ID de invitación inválido'
    )
  }

  const { error } = await supabase
    .from('guests')
    .delete()
    .eq('id', guestId)

  if (error) {
    console.error(error)

    throw new Error(
      'No se pudo eliminar la invitación'
    )
  }

  revalidatePath('/admin/dashboard')

  return {
    success: true,
  }
}