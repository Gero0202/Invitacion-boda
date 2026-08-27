"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styles from "@/css/music.module.css";

export interface MusicPlayerRef {
  playMusic: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerRef, { musicUrl?: string }>(
  ({ musicUrl = "/music/cancion.mp3" }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasStarted, setHasStarted] = useState(false); // Indica si ya se abrió el sobre

    useImperativeHandle(ref, () => ({
      playMusic: () => {
        if (audioRef.current) {
          audioRef.current.volume = 0.3;
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              setHasStarted(true); // Se activa el botón de forma permanente
            })
            .catch((err) => console.log("Error al reproducir:", err));
        }
      },
    }));

    const togglePlay = () => {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    };

    return (
      <>
        <audio ref={audioRef} src={musicUrl} preload="auto" loop />
        
        {/* Renderiza el botón de forma permanente una vez iniciada la música por primera vez */}
        {hasStarted && (
          <button
            onClick={togglePlay}
            className={`${styles.floatingButton} ${isPlaying ? styles.playing : styles.paused}`}
            aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
            title={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            {isPlaying ? "🎵" : "🔇"}
          </button>
        )}
      </>
    );
  }
);

MusicPlayer.displayName = "MusicPlayer";
export default MusicPlayer;