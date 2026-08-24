"use client"
import styles from "@/css/footer.module.css";

interface FooterProps {
  coupleNames?: string;
  hashtag?: string;
}

export default function Footer({
  coupleNames = "Sofía & Mateo",
  hashtag = "#BodaSofiaYMateo",
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <p className={styles.hashtag}>{hashtag}</p>
      <p className={styles.thanks}>
        ¡Gracias por acompañarnos en este día inolvidable!
      </p>
      <div className={styles.copyright}>
        <p>{coupleNames} — 2026</p>
      </div>
    </footer>
  );
}