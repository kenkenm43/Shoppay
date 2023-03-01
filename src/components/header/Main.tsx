import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { RiSearch2Line } from 'react-icons/ri'
import { FaOpencart } from 'react-icons/fa'
import { useSelector } from 'react-redux';

export default function Main() {
    const {cart} = useSelector((state:any) => ({ ...state }))
  return (
    <div className={styles.main}>
        <div className={styles.main__container}>
            <Link href="/">
                <span className={styles.logo}>
                    <Image src="/logo_transparent.png"
                        alt="" width={170} height={40}
                    />
                </span>
            </Link>
            <div className={styles.search}>
                <input type="text" placeholder="Search..." />
                <div className={styles.search__icon}>
                    <RiSearch2Line />
                </div>
            </div>
            <Link href="/cart">
                <span className={styles.cart}>
                    <FaOpencart />
                    <span className="cart">0</span>
                </span>
            </Link>
        </div>
    </div>
  )
}
