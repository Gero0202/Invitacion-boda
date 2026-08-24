import Image from "next/image";
import styles from "./page.module.css";
import Hero from "@/components/wedding/Hero";
import Story from "@/components/wedding/Story";
import EventDetails from "@/components/wedding/EventDetails";
import Location from "@/components/wedding/Location";
import Countdown from "@/components/wedding/Countdown";
import DressCode from "@/components/wedding/DressCode";
import GiftRegistry from "@/components/wedding/GiftRegistry";
import FAQ from "@/components/wedding/Faq";
import Footer from "@/components/wedding/Footer";

import { createClient } from '@/lib/supabase/server'

export default async function Home() {

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('guests')
    .select('*')

  console.log('DATA:', data)
  console.log('ERROR:', error)
  return (
    <div>


      <Hero />
      <Story />
      <EventDetails />
      <Location />
      <Countdown />
      <DressCode />
      <GiftRegistry />
      <FAQ />
      <Footer />
    </div>
  );
}
