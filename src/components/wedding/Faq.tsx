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
    <section className={styles.container}>
      <h2 className={styles.title}>Preguntas Frecuentes</h2>
      <div className={styles.accordion}>
        {defaultFaqs.map((faq, index) => (
          <div key={index} className={styles.item}>
            <button className={styles.question} onClick={() => toggle(index)}>
              <span>{faq.question}</span>
              <span className={styles.icon}>
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className={styles.answer}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}