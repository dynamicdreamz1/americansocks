import React from 'react'
import styles from "../css/ctabanner.module.css";

export default function Ctabanner() {
  return (
    <section className={styles.cta_banner}>
        <div className={styles.cta_banner_wrap}>
            <div className={styles.cta_banner_box_full}>
                <div className={styles.cta_banner_box_wrap}>
                    <div className={styles.cta_banner_image}>
                        <img src="../../images/cta-banner.png"/>  
                    </div>
                    <div className={styles.cta_banner_text}>
                        <h3>SS24 CATALOGUE DOWNLOAD</h3>
                        <div className={styles.cta_buttons}>
                            <a href="#" className={styles.btn}>Download Catalogue</a>
                            <a href="/collection" className={styles.btn1}>View Catalogue</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
