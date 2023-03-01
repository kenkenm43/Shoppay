import styles from './styles.module.scss'; 
import Image from 'next/image'
import Link from 'next/link';
import {signOut, signIn} from 'next-auth/react'
type Props = {
    session: any
}

export default function UserMenu({session}: Props) {
  return (
    <div className={styles.menu}>
        <h4>Welcome to Shoppay !</h4>
        { session ? ( 
        <div className={styles.flex}>
            <Image src={session.user.image}
            alt="" width={20} height={20}
            className={styles.menu__img}
            />
            <div className={styles.col}>
                <span>Welcome Back,</span>
                <h3>{session.user.name}</h3>
                <span onClick={() => signOut()}>Sign out</span>
            </div>
        </div> 
        ) : (
        <div className={styles.flex}>
            <button className={styles.btn_primary}>Register</button>
            <button className={styles.btn_outlined} onClick={() => signIn()}>Login</button>
        </div>
        )}
        <ul>
            <li>
                <Link href="/profile">Account</Link>
            </li>
            <li>
                <Link href="/profile/orders">My Orders</Link>
            </li>
            <li>
                <Link href="/profile/message">Message Center</Link>
            </li>
            <li>
                <Link href="/profile/address">Address</Link>
            </li>
            <li>
                <Link href="/profile/wishlist">Wishist</Link>
            </li>
        </ul>
    </div>
  )
}
