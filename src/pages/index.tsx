import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.scss'
import Header from '@/components/header'
import Footer from '@/components/footer'
import axios from 'axios'
import { useSession ,signIn, signOut } from "next-auth/react"

export default function Home({country}:any) {
  const {data: session} = useSession()
  return (
    <div>
      <Header country={country}/>
      {session ? "you are logged in" : "you are not logged in"}
      <Footer />
    </div>
  )
}

export async function getServerSideProps() {
  // let data = await axios
  //   .get(`https://api.ipregistry.co/?key=ukfrhy85svavk3il`)
  //   .then((res) => {
  //     return res.data.location.country;
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
    return {
      props: {
        country: { name: "Thailand", flag: "https://cdn.britannica.com/38/4038-004-111388C2/Flag-Thailand.jpg"  }
      }
    }
    
}