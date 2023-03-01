import styles from './styles.module.scss';
import Link from 'next/link'
import Image from 'next/image'
import { links } from './data/Links'

export default function Links() {
  return (
    <div className={styles.footer__links}>
        {
            links.map((link, index) => (
                <ul key={index}>
                    <li>
                    {
                            index == 0 ? <Image src="/logo_transparent.png"
                            alt="" width={140} height={100}/> : (<b>{link.heading}</b>)
                    }
                    </li>
                    {
                        link.links.map((link, index) => (
                            <li key={index}>
                                <Link href={link.link}>{link.name}</Link>
                            </li>
                        ))
                    }
                </ul>
            ))
        }
    </div>
  )
}
