import React from 'react'
import styles from "../css/category.module.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Categorybox() {
  return (
    <div className={styles.categories_box}>
        <a href="/collection/ankle-high">
        <Skeleton  height={230}  borderRadius="0" />
            <div className={styles.categories_box_image}>
                <img src="../../images/category-2.png"/>  
            </div>
            <h3>ANKLE HIGH</h3>
        </a>
    </div>
  )
}
