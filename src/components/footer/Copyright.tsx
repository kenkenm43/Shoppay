import styles from './styles.module.scss';
import { data } from "./data/Copyright"
import Link from 'next/link';
import {IoLocationSharp} from 'react-icons/io5'
import { shop } from "../../data/datashop"

export default function Copyright() {
  return (
    <div className={styles.footer__copyright}>
        <section>©2022 <span>{shop.name}</span>ALL Rights Reserved.</section>
        <ul>
            {data.map((link, index) => (
                <li key={index}>
                    <Link href={link.link}>{link.name}</Link>
                </li>
            ))}
            <li>
                <Link href="">
                    <IoLocationSharp /> Thailand
                </Link>
            </li>
        </ul>
    </div>
  )
}

