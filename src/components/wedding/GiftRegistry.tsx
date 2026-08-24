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
    alias: "boda.sofia.mateo",
    cbu: "0000003100012345678901",
    holder: "Sofía Gómez",
  },
  customText = "El mejor regalo para nosotros es contar con tu presencia. Si deseas hacernos un presente, podés colaborar con nuestra luna de miel.",
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
        <h2 className={styles.title}>Mesa de Regalos</h2>
        <p className={styles.text}>{customText}</p>

        <div className={styles.card}>
          <div className={styles.row}>
            <span className={styles.label}>Titular:</span>
            <span className={styles.value}>{bankAccount.holder}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Alias:</span>
            <span className={styles.value}>{bankAccount.alias}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>CBU:</span>
            <span className={styles.value}>{bankAccount.cbu}</span>
          </div>

          <button onClick={handleCopyAlias} className={styles.copyButton}>
            {copied ? "¡Alias copiado!" : "Copiar Alias"}
          </button>
        </div>
      </div>
    </section>
  );
}