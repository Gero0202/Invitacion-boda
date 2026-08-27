"use client";

import styles from "@/css/eventdetails.module.css";

interface EventDetailsProps {
  eventDate?: string;
  ceremonyTime?: string;
  partyTime?: string;
  venueName?: string;
  venueAddress?: string;
}

export default function EventDetails({
  ceremonyTime = "11:00 Hs",
  partyTime = "21:00 Hs",
  venueName = "Jano's Hipodromo de La Plata",
  venueAddress = "Av. 44, Calle 115",
}: EventDetailsProps) {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <span className={styles.subtitle}>Detalles de la celebración</span>
        <h2 className={styles.title}>¿Cuándo y Dónde?</h2>
      </div>

      <div className={styles.singleCard}>
        <div className={styles.venueHeader}>
          <span className={styles.badge}>Lugar</span>
          <h3 className={styles.venueTitle}>{venueName}</h3>
          <p className={styles.venueAddress}>{venueAddress}</p>
        </div>

        <div className={styles.scheduleDivider} aria-hidden="true" />

        <div className={styles.timeline}>
          <div className={styles.timeBlock}>
            <span className={styles.timeTag}>Ceremonia</span>
            <p className={styles.timeValue}>{ceremonyTime}</p>
          </div>

          <div className={styles.timelineDot}>❖</div>

          <div className={styles.timeBlock}>
            <span className={styles.timeTag}>Fin</span>
            <p className={styles.timeValue}>{partyTime}</p>
          </div>
        </div>
      </div>
    </section>
  );
}