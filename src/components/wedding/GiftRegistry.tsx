"use client";

import React, { useState } from "react";
import styles from "@/css/giftregistry.module.css";

interface BankAccount {
  currency: string;      // ej: "Cuenta en Pesos (ARS)" o "Cuenta en Dólares (USD)"
  holder: string;        // Titular
  accountNumber: string; // Número de Cuenta
  alias: string;         // Alias
  cbu: string;           // CBU / CBU Dólares
}

interface GiftRegistryProps {
  accounts?: BankAccount[];
  customText?: string;
}

const defaultAccounts: BankAccount[] = [
  {
    currency: "Cuenta en Pesos (ARS)",
    holder: "Laura Pilar Nani",
    accountNumber: "93-311388/8",
    alias: "Lauyadri.felicidad",
    cbu: "0170093040000031138888",
  },
  {
    currency: "Cuenta en Dólares (USD)",
    holder: "Laura Pilar Nani",
    accountNumber: "110-109642/4",
    alias: "Lauyadri.amor",
    cbu: "0170110044000010964242",
  },
];

export default function GiftRegistry({
  accounts = defaultAccounts,
  customText = "Lo más importante para nosotros es celebrar juntos. Si deseás hacernos un regalo, podés colaborar con un aporte a través de nuestras cuentas o mediante la urna que estará disponible el día de la fiesta.",
}: GiftRegistryProps) {
  // Guardamos cuál alias se copió según su índice
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyAlias = (alias: string, index: number) => {
    if (alias) {
      navigator.clipboard.writeText(alias);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Presentes</span>
          <h2 className={styles.title}>Regalos & Luna de Miel</h2>
        </div>

        <p className={styles.text}>{customText}</p>

        <div className={styles.cardsContainer}>
          {accounts.map((acc, index) => (
            <div key={index} className={styles.card}>
              <span className={styles.currencyBadge}>{acc.currency}</span>

              <div className={styles.row}>
                <span className={styles.label}>Titular</span>
                <span className={styles.value}>{acc.holder}</span>
              </div>

              <div className={styles.row}>
                <span className={styles.label}>Nº de Cuenta</span>
                <span className={styles.value}>{acc.accountNumber}</span>
              </div>

              <div className={styles.row}>
                <span className={styles.label}>Alias</span>
                <span className={styles.aliasValue}>{acc.alias}</span>
              </div>

              <div className={styles.row}>
                <span className={styles.label}>CBU</span>
                <span className={styles.value}>{acc.cbu}</span>
              </div>

              <button
                type="button"
                onClick={() => handleCopyAlias(acc.alias, index)}
                className={`${styles.copyButton} ${
                  copiedIndex === index ? styles.copied : ""
                }`}
              >
                {copiedIndex === index ? "✓ ¡Alias copiado!" : "Copiar Alias"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}