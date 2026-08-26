import styles from "@/css/dashboardstats.module.css"

interface DashboardStatsProps {
  guests: {
    id: string
    name: string
    token: string
    created_at: string
    rsvps:
      | {
          attendance: boolean
          confirmed_at: string
          updated_at: string
        }
      | null
  }[]
}

export default function DashboardStats({
  guests,
}: DashboardStatsProps) {
  const total = guests.length

  let confirmed = 0
  let declined = 0
  let pending = 0

  guests.forEach((guest) => {
    const rsvp = guest.rsvps

    if (!rsvp) {
      pending++
      return
    }

    if (rsvp.attendance === true) {
      confirmed++
      return
    }

    declined++
  })

  return (
   <section className={styles.statsGrid}>
      <div className={styles.card}>
        <span className={styles.label}>Total</span>
        <strong className={styles.value}>{total}</strong>
      </div>

      <div className={`${styles.card} ${styles.cardConfirmed}`}>
        <span className={styles.label}>Confirmados</span>
        <strong className={styles.value}>{confirmed}</strong>
      </div>

      <div className={`${styles.card} ${styles.cardDeclined}`}>
        <span className={styles.label}>No asisten</span>
        <strong className={styles.value}>{declined}</strong>
      </div>

      <div className={`${styles.card} ${styles.cardPending}`}>
        <span className={styles.label}>Pendientes</span>
        <strong className={styles.value}>{pending}</strong>
      </div>
    </section>
  )
}