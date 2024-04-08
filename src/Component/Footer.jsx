import React from 'react'
import styles from "../css/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer_wrap}>
          <div className={styles.footer_left}>
              <p><span>American Socks SL</span> ESB66133828 c/Sant Pere Mes Alt 52 08003 Barcelona (Spain)</p>
              <p>© 2021 American Socks Pro All rights reserved. We Are Your Sock Dealer.</p>
          </div>
          <div className={styles.footer_right}>
            <ul className={styles.footer_menu}>
                <li><a href="#">PURCHASE CONDITIONS</a></li>
                <li><a href="#">NEWS</a></li>
                <li><a href="#">RESOURCES</a></li>
                <li><a href="/myaccount">MY ACCOUNT</a></li>
            </ul>
            <div className={styles.social_media_logo}>
              <a href="">
                  <img src="../../images/facebook-white.png"/>
              </a>
              <a href="">
                  <img src="../../images/twitter-white.png"/>
              </a>
              <a href="">
                  <img src="../../images/instagram-white.png"/>
              </a>
              <a href="">
                  <img src="../../images/youtube-white.png"/>
              </a>
              <a href="">
                  <img src="../../images/email-white.png"/>
              </a>
          </div>
          </div>
        </div>
      </div>

    </footer>
  )
}
