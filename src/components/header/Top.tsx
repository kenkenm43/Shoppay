import styles from './styles.module.scss';
import { MdSecurity } from 'react-icons/md'
import { BsSuitHeart } from 'react-icons/bs'
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';
import UserMenu from './UserMenu';
import { useSession } from 'next-auth/react';

export default function Top({country} :any) {
    const { data: session }:any = useSession()
    const [loggedIn, setLoggedIn] = useState(true)
    const [visible, setVisible] = useState(false)
    return (
    <div className={styles.top}>
        <div className={styles.top__container}>
            <div></div>

            <ul className={styles.top__list}>
                
                <li className={styles.li}>
                    <Image 
                    src={country.flag}
                    alt="" 
                    width={20}
                    height={20}
                    />
                    <span>{country.name} / THB</span>
                </li>
                <li className={styles.li}>
                    <MdSecurity />
                    <span>Buyer Protection</span>
                </li>
                <li className={styles.li}>
                    <span>Customer Service</span>
                </li>
                <li className={styles.li}>
                    <span>Help</span>
                </li>
                <li className={styles.li}>
                    <BsSuitHeart />
                    <Link href="/profile/wishlist">
                        <span>Wishlist</span>
                    </Link>
                </li>
                <li className={styles.li}
                    onMouseOver={() => setVisible(true)}
                    onMouseLeave={() => setVisible(false)}
                >
                    { session ? (
                    <span className={styles.li}>
                        <div className={styles.flex}>
                            <Image src={session?.user.image}
                            alt="" width={20} height={20}/>
                            {/* <RiAccountPinCircleLine /> */}
                            <span>{session?.user.name}</span>
                            <RiArrowDropDownFill />
                        </div>
                    </span>
                        ) : (
                    <span className={styles.li}>
                        <div className={styles.flex}>
                            <RiAccountPinCircleLine />
                            <span>Account</span>
                            <RiArrowDropDownFill />
                        </div>
                    </span>
                    )}
                    {visible && 
                        <UserMenu session={session}/>
                    }
                </li>
            </ul>
        </div>
    </div>
  )
}
