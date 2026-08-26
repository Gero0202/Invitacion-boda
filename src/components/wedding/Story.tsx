"use client";

import Image from "next/image";
import styles from "@/css/story.module.css";

interface StoryProps {
  storyText?: string;
  imageUrl?: string;
}

export default function Story({
  storyText = "Parece que fue ayer cuando nos conocimos. Después de recorrer varios caminos juntos, reír, viajar y compartir mil momentos, decidimos dar este gran paso y celebrar el amor rodeados de las personas que más queremos.",
  imageUrl = "https://i.pinimg.com/736x/49/b9/3e/49b93e4568fb061b06f744c2a8ff3a5b.jpg",
}: StoryProps) {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <span className={styles.subtitle}>Un recorrido juntos</span>
        <h2 className={styles.title}>Nuestra Historia</h2>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt="Nuestra Historia"
          width={600}
          height={400}
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.textWrapper}>
        <span className={styles.quoteMark}>“</span>
        <p className={styles.text}>{storyText}</p>
        <div className={styles.decorativeLine} />
      </div>
    </section>
  );
}