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

  // Validar tipo
  if (typeof name !== 'string') {
    throw new Error('El nombre de la invitación no es válido')
  }

  // Limpiar espacios
  const cleanName = name
    .trim()
    .replace(/\s+/g, ' ')

  // Validar longitud
  if (!cleanName) {
    throw new Error(
      'El nombre de la invitación es obligatorio'
    )
  }

  if (cleanName.length < 2) {
    throw new Error(
      'El nombre debe tener al menos 2 caracteres'
    )
  }

  if (cleanName.length > 100) {
    throw new Error(
      'El nombre no puede superar los 100 caracteres'
    )
  }

  // Generar token único
  const token = randomBytes(16).toString('hex')

  // Crear invitado
  const { data, error } = await supabase
    .from('guests')
    .insert({
      name: cleanName,
      token,
    })
    .select()
    .single()

  if (error) {
    console.error(error)

    throw new Error(
      'No se pudo crear la invitación'
    )
  }

  revalidatePath('/admin/dashboard')

  return data
}


export async function updateGuest(
  guestId: string,
  name: string
) {
  await requireAdmin()

  const supabase = await createClient()

  // Validar ID
  if (
    typeof guestId !== 'string' ||
    !guestId.trim()
  ) {
    throw new Error(
      'ID de invitación inválido'
    )
  }

  // Validar tipo
  if (typeof name !== 'string') {
    throw new Error(
      'El nombre de la invitación no es válido'
    )
  }

  // Limpiar espacios
  const cleanName = name
    .trim()
    .replace(/\s+/g, ' ')

  // Validar nombre
  if (!cleanName) {
    throw new Error(
      'El nombre de la invitación es obligatorio'
    )
  }

  if (cleanName.length < 2) {
    throw new Error(
      'El nombre debe tener al menos 2 caracteres'
    )
  }

  if (cleanName.length > 100) {
    throw new Error(
      'El nombre no puede superar los 100 caracteres'
    )
  }

  // Actualizar solamente el nombre
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