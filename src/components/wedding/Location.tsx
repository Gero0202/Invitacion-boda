"use client";

import styles from "@/css/location.module.css";

interface LocationProps {
  address?: string;
  googleMapsUrl?: string;
  embedMapUrl?: string;
}

export default function Location({
  address = "Av. 44 , Calle 115 , La Plata.",
  googleMapsUrl = "https://maps.google.com",
  embedMapUrl,
}: LocationProps) {
  const defaultEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
    address
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.subtitle}>¿Cómo llegar?</span>
          <h2 className={styles.title}>Ubicación</h2>
          <p className={styles.address}>{address}</p>
        </div>

        <div className={styles.mapWrapper}>
          <iframe
            className={styles.mapIframe}
            src={embedMapUrl || defaultEmbed}
            loading="lazy"
            allowFullScreen
            title="Ubicación del evento"
          />
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          <span>Abrir en Google Maps</span>
          <span className={styles.buttonIcon}>➔</span>
        </a>
      </div>
    </section>
  );
}