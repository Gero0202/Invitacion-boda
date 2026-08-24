"use client";
import styles from "@/css/story.module.css";

interface StoryProps {
    storyText?: string;
}

export default function Story({ storyText }: StoryProps) {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Nuestra Historia</h2>
            <p className={styles.text}>
                {storyText ||
                    "Parece que fue ayer cuando nos conocimos. Después de recorrer varios caminos juntos, reír, viajar y compartir mil momentos, decidimos dar este gran paso y celebrar el amor rodeados de las personas que más queremos."}
            </p>
        </section>
    );
}