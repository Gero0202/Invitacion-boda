"use client";

import { useState, useEffect } from "react";
import styles from "@/css/envelope.module.css";

interface EnvelopeOverlayProps {
  guestName?: string;
  coupleInitials?: string;
  onOpen?: () => void; // Callback para iniciar música
}

export default function EnvelopeOverlay({
  guestName = "Familia / Invitado",
  coupleInitials = "A & L",
  onOpen,
}: EnvelopeOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);

  useEffect(() => {
    if (!isDestroyed) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isDestroyed]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsDestroyed(true);
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        window.scrollTo(0, 0);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOpen = () => {
    if (isOpen) return;
    if (onOpen) onOpen(); // Dispara la música en el componente padre
    setIsOpen(true);
  };

  if (isDestroyed) return null;

  return (
    <div className={`${styles.viewport} ${isOpen ? styles.opened : ""}`}>
      <div className={styles.ambientLight} />
      <div className={styles.envelopeWrapper}>
        <div className={styles.insidePocket} />
        <div className={styles.letterCard}>
          <div className={styles.letterContent}>
            <span className={styles.letterTag}>Invitación Especial</span>
            <h1 className={styles.guestName}>{guestName}</h1>
          </div>
        </div>
        <div className={styles.leftFlap} />
        <div className={styles.rightFlap} />
        <div className={styles.bottomFlap} />
        <div className={styles.topFlap}>
          <div className={styles.topFlapShadow} />
        </div>
        <button
          type="button"
          className={styles.sealButton}
          onClick={handleOpen}
          aria-label="Abrir sobre de la invitación"
        >
          <div className={styles.realWaxSeal}>
            <div className={styles.waxInnerRim}>
              <span className={styles.monogram}>{coupleInitials}</span>
            </div>
          </div>
          <span className={styles.sealTooltip}>Toca para abrir</span>
        </button>
      </div>
    </div>
  );
}