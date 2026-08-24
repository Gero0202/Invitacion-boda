"use client";
import styles from "@/css/location.module.css";

interface LocationProps {
  address?: string;
  googleMapsUrl?: string;
  embedMapUrl?: string;
}

export default function Location({
  address = "Av. Del Libertador 1234, Buenos Aires",
  googleMapsUrl = "https://maps.google.com",
  embedMapUrl,
}: LocationProps) {
  // URL por defecto para el iframe de Google Maps usando la dirección
  const defaultEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
    address
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Ubicación</h2>
      <p className={styles.address}>{address}</p>

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
        Cómo llegar con Google Maps
      </a>
    </section>
  );
}