"use client";

import { useRef, ReactNode } from "react";
import EnvelopeOverlay from "@/components/wedding/EnvelopeOverlay";
import MusicPlayer, { MusicPlayerRef } from "@/components/wedding/MusicPlayer";

interface ClientInvitationWrapperProps {
  guestName?: string;
  coupleInitials?: string;
  musicUrl?: string;
  children: ReactNode;
}

export default function ClientInvitationWrapper({
  guestName,
  coupleInitials,
  musicUrl = "/music/cancion.mp3",
  children,
}: ClientInvitationWrapperProps) {
  const musicRef = useRef<MusicPlayerRef>(null);

  return (
    <>
      <MusicPlayer ref={musicRef} musicUrl={musicUrl} />
      <EnvelopeOverlay
        guestName={guestName}
        coupleInitials={coupleInitials}
        onOpen={() => musicRef.current?.playMusic()}
      />
      {children}
    </>
  );
}