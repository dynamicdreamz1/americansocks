import React from 'react'
import styles from "../css/category.module.css";
import Categorybox from "./Categorybox";

export default function Category() {
  return (
    <section className={styles.categories}>
        <div className="container">
            <div className={styles.categories_wrap}>
                {/* box 1 */}
                <Categorybox />
                 
                {/* box 2 */}
                <Categorybox />
    
                {/* box 3 */}
                <Categorybox />
               
                {/* box 4 */}             
                <Categorybox />
              
          
                {/* box 5 */}
                <Categorybox />
       
                {/* box 6 */}
                <Categorybox />

                {/* box 7 */}
                <div className={styles.categories_box}>
                    <a href="/collection/underware">
                        <div className={styles.categories_box_image}>
                            <img src="../../images/category-7.png"/>  
                        </div>
                        <h3>UNDERWEAR</h3>
                    </a>
                </div>

                {/* box 8 */}
                <div className={styles.categories_box}>
                    <a href="/collection/clothing">
                        <div className={styles.categories_box_image}>
                            <img src=""/>  
                        </div>
                        <h3>CLOTHING</h3>
                    </a>
                </div>
              
                {/* box 9 */}
                <div className={styles.categories_box}>
                    <a href="/collection/accessories">
                        <div className={styles.categories_box_image}>
                            <img src="../../images/category-9.png"/>  
                        </div>
                        <h3>ACCESSORIES</h3>
                    </a>
                </div>
            
                {/* box 10 */}
                <div className={styles.categories_box}>
                    <a href="/collection/gift-box">
                        <div className={styles.categories_box_image}>
                            <img src="../../images/category-10.png"/>  
                        </div>
                        <h3>GIFT BOXES</h3>
                    </a>
                </div>

                {/* box 11 */}
                <div className={styles.categories_box}>
                    <a href="/collection/neon-signs">
                        <div className={styles.categories_box_image}>
                            <img src="../../images/category-11.png"/>  
                        </div>
                        <h3>NEON SIGNS</h3>
                    </a>
                </div>
               

                {/* box 12 */}
                <div className={styles.categories_box}>
                    <a href="/collection/displays">
                        <div className={styles.categories_box_image}>
                            <img src="../../images/category-12.png"/>  
                        </div>
                        <h3>DISPLAYS</h3>
                    </a>
                </div>
            </div>
        </div>
    </section>
  )
}
