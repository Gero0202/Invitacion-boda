"use client";

import React, { useState } from "react";
import styles from "@/css/giftregistry.module.css";

interface BankAccount {
  alias: string;
  cbu: string;
  holder: string;
}

interface GiftRegistryProps {
  bankAccount?: BankAccount;
  customText?: string;
}

export default function GiftRegistry({
  bankAccount = {
    alias: "boda.adrian.laura",
    cbu: "0000003100012345678901",
    holder: "Laura Pilar Nani",
  },
  customText = "Lo más importante para nosotros es celebrar juntos. Si deseás hacernos un regalo, podés colaborar con un aporte a través de nuestra cuenta.",
}: GiftRegistryProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAlias = () => {
    if (bankAccount?.alias) {
      navigator.clipboard.writeText(bankAccount.alias);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
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

        <div className={styles.card}>
          <div className={styles.row}>
            <span className={styles.label}>Titular</span>
            <span className={styles.value}>{bankAccount.holder}</span>
          </div>
          
          <div className={styles.row}>
            <span className={styles.label}>Alias</span>
            <span className={styles.aliasValue}>{bankAccount.alias}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>CBU</span>
            <span className={styles.value}>{bankAccount.cbu}</span>
          </div>

          <button
            onClick={handleCopyAlias}
            className={`${styles.copyButton} ${copied ? styles.copied : ""}`}
          >
            {copied ? "✓ ¡Alias copiado!" : "Copiar Alias"}
          </button>
        </div>
      </div>
    </section>
  );
}