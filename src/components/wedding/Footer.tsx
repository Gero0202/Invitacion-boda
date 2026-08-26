"use client";

import styles from "@/css/footer.module.css";

interface FooterProps {
  coupleNames?: string;
  hashtag?: string;
}

export default function Footer({
  coupleNames = "Adrian & Laura",
  hashtag = "#BodaLauraYAdrian",
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.divider} />

        <p className={styles.hashtag}>{hashtag}</p>

        <p className={styles.thanks}>
          ¡Gracias por acompañarnos en este día inolvidable!
        </p>

        <div className={styles.copyright}>
          <p>{coupleNames} — 2026</p>
        </div>
      </div>
    </footer>
  );
}