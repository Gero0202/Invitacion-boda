import type { Metadata } from "next";
import "./globals.css";

import { 
  Plus_Jakarta_Sans, 
  Cormorant_Garamond, 
  Great_Vibes 
} from 'next/font/google'

// Fuente limpia para el Panel Admin e interfaz
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// Serif elegante para títulos del Admin y textos formales de la tarjeta
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

// Script / Caligráfica para los nombres en la Carta de Invitación
const script = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Invitacion a boda",
  description: "Invitacion para la boda de Adrian y Laura.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
