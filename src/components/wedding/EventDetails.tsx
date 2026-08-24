"use client";
import styles from "@/css/eventdetails.module.css";

interface EventDetailsProps {
  ceremonyTime?: string;
  partyTime?: string;
  ceremonyPlace?: string;
  partyPlace?: string;
}

export default function EventDetails({
  ceremonyTime = "18:00 Hs",
  partyTime = "20:00 Hs",
  ceremonyPlace = "Parroquia Nuestra Señora",
  partyPlace = "Salón San Martín",
}: EventDetailsProps) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>¿Cuándo y Dónde?</h2>
      <div className={styles.cardsWrapper}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Ceremonia</h3>
          <p className={styles.time}>{ceremonyTime}</p>
          <p className={styles.description}>{ceremonyPlace}</p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Fiesta</h3>
          <p className={styles.time}>{partyTime}</p>
          <p className={styles.description}>{partyPlace}</p>
        </div>
      </div>
    </section>
  );
}