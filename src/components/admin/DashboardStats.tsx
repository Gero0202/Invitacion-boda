
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
    <section>
      <div>
        <span>Total</span>
        <strong>{total}</strong>
      </div>

      <div>
        <span>Confirmados</span>
        <strong>{confirmed}</strong>
      </div>

      <div>
        <span>No asisten</span>
        <strong>{declined}</strong>
      </div>

      <div>
        <span>Pendientes</span>
        <strong>{pending}</strong>
      </div>
    </section>
  )
}