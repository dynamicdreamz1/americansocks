import React from 'react'
import styles from "../css/fullbanner.module.css";

export default function Fullbanner() {
  return (
    <section className={styles.full_image_banner}>
        <div className="container">
            <div className={styles.banner_wrap}>
                <div className={styles.banner_box_full}>
                    <div className={styles.banner_box_wrap}>
                        <div className={styles.banner_image}>
                            <img src="../../images/full-banner.png"/>  
                        </div>
                        <div className={styles.banner_text}>
                            <h2>best sellers</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
