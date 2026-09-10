"use client";

import useWindowSize from "@/components/ui/WindowSize";
import Carrusel from "../wedding/Carrusel";
import CarruselInfinito from "../wedding/CarruselInf";

export default function CarruselSizeWindows() {
  const { width } = useWindowSize();
  const isDesktop = (width ?? 0) >= 700;

  return <div>{isDesktop ? <CarruselInfinito/> : <Carrusel/>}</div>;
}