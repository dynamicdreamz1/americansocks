import React from 'react'
import styles from "../css/banner.module.css";
export default function Banner() {
  return (
    <section className={styles.image_banner}>
        <div className="container">
            <div className={styles.banner_wrap}>

              <div className={styles.banner_box}>
                  <div className={styles.banner_box_wrap}>
                    <div className={styles.banner_image}>
        
                      <img src="../../images/banner-img1.png"/>  
                    </div>
                    <div className={styles.banner_text}>
                      <h2>pre-order</h2>
                    </div>
                  </div>
           

              </div>
           
              <div className={styles.banner_box}>
                  <div className={styles.banner_image}>
                    <img src="../../images/banner-img2.png"/>  
                  </div>
                  <div className={styles.banner_text}>
                    <h2>re-order</h2>
                  </div>
              </div>
            </div>
        </div>
    </section>
  )
}
