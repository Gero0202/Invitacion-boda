import React from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from './LogoutButton'
import styles from '@/css/dashboardadmin.module.css'
import Link from 'next/link'
import GuestFormWrapper from './GuestFormWrapper'
import GuestList from '@/components/admin/GuestList'



export default async function DashboardPage() {
  const supabase = await createClient()


  // getClaims valida el JWT localmente mediante JWKS cached (mucho más rápido que getUser)
  const { data: claimsData } = await supabase.auth.getClaims()
  const claims = claimsData?.claims

  // Si no está autenticado, redirige inmediatamente en el servidor
  if (!claims) {
    redirect('/login')
  }

  // Extraemos el email directamente de los claims
  const userEmail = typeof claims.email === 'string' ? claims.email : 'Usuario'

  const { data: guests, error } = await supabase
    .from('guests')
    .select('*')
    .order('created_at', {
      ascending: false,
    })

  if (error) {
    throw new Error('No se pudieron cargar los invitados')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.brand}>Panel de Control</h2>
        <div className={styles.actions}>
          <Link href="/" className={styles.homeLink}>
            Inicio
          </Link>
          <LogoutButton />
        </div>
      </header>

     <main className={styles.main}>
        <h1 className={styles.title}>¡Hola de nuevo, {userEmail}!</h1>
        <p className={styles.subtitle}>
          Gestioná la lista de invitados y sus pases desde este panel.
        </p>

        <div className={styles.dashboardLayout}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Agregar invitado</h2>
            <GuestFormWrapper />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Invitados</h2>
            <GuestList guests={guests ?? []} />
          </section>
        </div>
      </main>
    </div>
  )
}