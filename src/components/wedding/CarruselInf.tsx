import React from "react";
import styles from "@/css/carruselinf.module.css";
import { Montserrat } from "next/font/google";
import Image from "next/image";


const montserrat = Montserrat({
    subsets: ['latin'],
    weight: 'variable'
})

export default function CarruselInfinito() {
    return (
        <>
            <div className={styles["div-general"]}>
                <div className={styles["slider"]}>
                    <div className={styles["slide-track"]}>
                        <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                        <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                       <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                       <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                       <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                        <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                       <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                       <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                        <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>




                        {/* REPEAT */}
                       <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                        <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                       <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                       <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                       <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                        <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                       <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                       <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                        <div className={styles["slide"]}>
                            <Image
                                src="/images/63.jpeg"
                                alt="Foto de la boda"
                                width={400}
                                height={400}
                                quality={90}
                            />
                        </div>

                    </div>
                </div>
                <div className={styles["modal"]}>
                </div>
            </div>
        </>
    );
}