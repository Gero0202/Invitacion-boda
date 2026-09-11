
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "@/css/carrusel.module.css";
import { Montserrat } from "next/font/google"
import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion"

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: 'variable'
})

const images = [
    "/images/63.jpeg",
    "/images/90.jpeg",
    "/images/173.jpeg",
    "/images/2.jpeg",
    "/images/3.jpeg",
    "/images/4.jpeg",
    "/images/6.jpeg",
    "/images/7.jpeg",
    "/images/8.jpeg",
    "/images/32.jpeg",
    "/images/5.jpeg",
];



function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export default function Carrusel() {

    const shuffledImages = useMemo(() => shuffleArray(images), [])

    const settings = {
        infinite: true,
        dots: false,
        centerMode: true,
        centerPadding: "75px",
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 1500,

        speed: 500,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    centerMode: true,
                    centerPadding: "100px",
                }
            }
        ]
    };

    return (
        <div className={styles["div-container"]}>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.2 }}
            >


            </motion.div>
            <Slider {...settings}>
                {images.map((src, index) => (
                    <div key={index} className={styles["slide"]}>
                        <Image
                            src={src}
                            alt={`img-${index}`}
                            width={400}
                            height={400}
                            quality={90}
                            className={styles["slide-img"]}
                        />
                    </div>
                ))}
            </Slider>

        </div>
    );
}