"use client";

import styles from "@/css/dresscode.module.css";

interface DressCodeProps {
  code?: string;
  note?: string;
}

export default function DressCode({
  code = "Elegante",
  note = "Vení a celebrar con tu mejor look elegante y preparate para disfrutar y bailar toda la noche.",
}: DressCodeProps) {
  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Sugerencia de vestuario</span>
          <h2 className={styles.title}>Dress Code</h2>
        </div>

        <div className={styles.badgeWrapper}>
          <span className={styles.codeType}>{code}</span>
        </div>

        <p className={styles.note}>{note}</p>
      </div>
    </section>
  );
}