"use client";
import styles from "@/css/hero.module.css";

interface HeroProps {
  coupleNames?: string;
  guestName?: string;
  allowedGuests?: number;
}

export default function Hero({
  coupleNames = "Sofía & Mateo",
  guestName
}: HeroProps) {
  return (
    <section className={styles.hero}>
      <p className={styles.subhead}>¡Nos casamos!</p>
      <h1 className={styles.title}>{coupleNames}</h1>

      {guestName ? (
        <div className={styles.guestBadge}>
          <p className={styles.guestName}>¡Hola, {guestName}!</p>
          <p className={styles.passes}>
            Estamos felices de compartir este día tan especial con vos.
          </p>
        </div>
      ) : (
        <p className={styles.passes}>
          Estamos felices de compartir este día tan especial con vos.
        </p>
      )}
    </section>
  );
}