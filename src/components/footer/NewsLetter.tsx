import styles from './styles.module.scss';

export default function NewsLetter() {
  return (
    <div className={styles.footer__newsletter}>
        <h3>SIGN UP FOR OUR NEWSLETTER</h3>
        <div className={styles.footer__flex}>
            <input type="text" placeholder="Your Email Address"/>
            <button className={styles.btn_primary}>SUBSCRIBE</button>
        </div>
        <p>
            By clicking the SUBSCRIBE button, you are agreeing to {" "}
            <a href="">ourPrivacy & Cookie Policy</a>
        </p>
    </div>
  )
}
