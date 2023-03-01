import { BsInstagram, BsPinterest, BsSnapchat, BsTwitter, BsYoutube } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import styles from './styles.module.scss';

export default function Socials() {
  return (
   <div className={styles.footer__socials}>
    <section>
        <h1>STAY CONNECTED</h1>
        <ul>
            <li>
                <a href="" target="_blank">
                    <FaFacebook />
                </a>
            </li>
            <li>
                <a href="" target="_blank">
                    <BsInstagram />
                </a>
            </li>
            <li>
                <a href="" target="_blank">
                    <BsTwitter />
                </a>
            </li>
            <li>
                <a href="" target="_blank">
                    <BsYoutube />
                </a>
            </li>
            <li>
                <a href="" target="_blank">
                    <BsPinterest />
                </a>
            </li>
            <li>
                <a href="" target="_blank">
                    <BsSnapchat />
                </a>
            </li>
        </ul>
    </section>
   </div>
  )
}
