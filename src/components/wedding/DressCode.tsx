"use client";
import styles from "@/css/dresscode.module.css";

interface DressCodeProps {
  code?: string;
  note?: string;
}

export default function DressCode({
  code = "Elegante",
  note = "Queremos que te veas increíble y estés cómodo/a para bailar toda la noche.",
}: DressCodeProps) {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>Código de Vestimenta</h2>
        <p className={styles.codeType}>{code}</p>
        <p className={styles.note}>{note}</p>
      </div>
    </section>
  );
}