"use client";

import React, { useState, useEffect } from "react";
import styles from "@/css/countdown.module.css";

interface CountdownProps {
  targetDate?: string; // Formato ISO, ej: "2026-11-20T18:00:00"
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({
  targetDate = "2026-11-20T18:00:00",
}: CountdownProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const padWithZero = (num: number) => String(num).padStart(2, "0");

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Cuenta regresiva</span>
          <h2 className={styles.title}>Falta muy poco</h2>
        </div>

        <div className={styles.timerGrid}>
          <div className={styles.unitCard}>
            <span className={styles.number}>
              {mounted ? padWithZero(timeLeft.days) : "00"}
            </span>
            <span className={styles.label}>Días</span>
          </div>

          <span className={styles.timeSeparator}>:</span>

          <div className={styles.unitCard}>
            <span className={styles.number}>
              {mounted ? padWithZero(timeLeft.hours) : "00"}
            </span>
            <span className={styles.label}>Horas</span>
          </div>

          <span className={styles.timeSeparator}>:</span>

          <div className={styles.unitCard}>
            <span className={styles.number}>
              {mounted ? padWithZero(timeLeft.minutes) : "00"}
            </span>
            <span className={styles.label}>Minutos</span>
          </div>

          <span className={styles.timeSeparator}>:</span>

          <div className={styles.unitCard}>
            <span className={styles.number}>
              {mounted ? padWithZero(timeLeft.seconds) : "00"}
            </span>
            <span className={styles.label}>Segundos</span>
          </div>
        </div>
      </div>
    </section>
  );
}