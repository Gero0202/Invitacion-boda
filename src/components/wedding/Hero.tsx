"use client";

import styles from "@/css/hero.module.css";


interface HeroProps {
  coupleNames?: string;
  guestName?: string;
  allowedGuests?: number;
}

export default function Hero({
  coupleNames = "Laura & Adrian",
  guestName
}: HeroProps) {
  return (
    <section className={styles.heroContainer}>
      
      <div className={styles.heroCard}>
        <span className={styles.subtitle}>¡Nos casamos!</span>
        
        <h1 className={styles.title}>{coupleNames}</h1>

        <div className={styles.divider} aria-hidden="true">
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerDot}>❖</span>
          <span className={styles.dividerLine}></span>
        </div>

        {guestName ? (
          <div className={styles.guestBadge}>
            <p className={styles.guestGreeting}>¡Hola, {guestName}!</p>
            <p className={styles.passesText}>
              Estamos muy felices de compartir este día tan especial con vos.
            </p>
          </div>
        ) : (
          <p className={styles.passesText}>
            Estamos muy felices de compartir este día tan especial con vos.
          </p>
        )}
      </div>
    </section>
  );
}