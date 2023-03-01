import styles from './styles.module.scss';
import Image from 'next/image'

export default function Payment() {
  return (
    <div className={styles.footer__payment}>
        <h3>WE ACCEPT</h3>
        <div className={styles.footer__flexwrap}>
            <Image src="/images/payment/visa.webp" alt="" width={60} height={36}/>
            <Image src="/images/payment/mastercard.webp" alt="" width={60} height={36}/>
            <Image src="/images/payment/paypal.webp" alt="" width={60} height={36}/>
        </div>
    </div>
  )
}
