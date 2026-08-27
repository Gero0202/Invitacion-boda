"use client";

import React, { useState } from "react";
import styles from "@/css/faq.module.css";

interface FAQItem {
  question: string;
  answer: string;
}

const defaultFaqs: FAQItem[] = [
  {
    question: "¿Hasta cuándo tengo tiempo de confirmar asistencia?",
    answer:
      "Agradecemos que nos confirmes antes del 15 de Octubre para poder definir el menú y los detalles finales del salón.",
  },
  {
    question: "¿Hay estacionamiento en el lugar?",
    answer:
      "Sí, el predio cuenta con estacionamiento privado con personal de seguridad durante todo el evento.",
  },
  {
    question: "¿Puedo asistir con niños?",
    answer:
      "La invitación indica la cantidad de pases asignados para tu grupo familiar en el encabezado de la web.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.background}>

    
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Información útil</span>
          <h2 className={styles.title}>Preguntas Frecuentes</h2>
        </div>

        <div className={styles.accordion}>
          {defaultFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.question}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <span className={styles.icon}>{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className={styles.answer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </div>
  );
}