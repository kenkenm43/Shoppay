import React, { useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import styles from '../styles/signin.module.scss'
import {BiLeftArrowAlt} from 'react-icons/bi'
import Link from 'next/link'
import Image from 'next/image'
import { Formik, Form} from 'formik'
import * as Yup from "yup"
import LoginInput from '@/components/inputs/loginInput'
import CircledIconBtn from '@/components/buttons/CircledIconBtn'
import { getProviders } from 'next-auth/react'
import { useSession, signIn, signOut } from "next-auth/react"
import axios from 'axios'
import DotLoaders from '@/components/loaders/dotLoaders'


const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: ""
}

export default function Signin({country, providers}:any) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(initialValues)
  const {login_email, login_password, name, email, password, conf_password, success, error} = user
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value})
  }
  const loginValidation = Yup.object({
    login_email: Yup.string().required("Email address is required").email("Please enter a valid email address"),
    login_password: Yup.string().required("Please enter a password")
  })
  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What's your name ?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required("You'll need this when you log in and if you ever need to reset your password.")
      .email("Enter a valid email address"),
    password: Yup.string()
      .required("Enter a combination of at least six numbers, letters and punctuation marks(such as ! and &).")
      .min(6, "Password must be at least 6 characters.")
      .max(36, "Password can't be more than 36 characters."),
      conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match.")
  })
  const signUpHandler = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post('/api/auth/signup', {
        name, email, password,
      })
      setUser({...user,error:"", success: data.message})
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      setUser({...user,success:"", error: error.response.data.message})
    }
  }
  return (
    <>
    {
      loading && <DotLoaders loading={loading}/>
    }
    <Header country={country}/>
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We&apos;d be happy to join us! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>Get access to one of the best Eshopping services in the world.</p>
         <Formik 
         enableReinitialize 
         initialValues={{
          login_email,
          login_password
         }}
         validationSchema={loginValidation}
         onSubmit={()=>{}}
         >
            {
              (form) => (
                <Form>
                  <LoginInput 
                  type="text"
                  name="login_email"
                  onChange={handleChange}
                  icon="email" placeholder="Email Address"/>
                  <LoginInput 
                  type="password"
                  name="login_password"
                  onChange={handleChange}
                  icon="password" placeholder="Password"/>
                  <CircledIconBtn type="submit" text="Sign in"/>
                  <div className={styles.forgot}>
                    <Link href="/forgot">Forgot password</Link>
                  </div>
                </Form>
              )
            }
        </Formik>
          <div className={styles.login__socials}>
          <span className={styles.or}>Or continue with</span>
            <div className={styles.login__socials_wrap}>
              {providers.map((provider:any, index:any) => (
              <div key={provider.name}>
                <button className={styles.social__btn} onClick={() => signIn(provider.id)}>
                  <Image src={`/icons/${provider.name}.png`} alt="" width={26} height={40} />
                Sign in with {provider.name}
                </button>
              </div>
            ))}
            </div>
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign up</h1>
            <p>Get access to one of the best Eshopping services in the world.</p>
         <Formik 
         enableReinitialize 
         initialValues={{
          name, email, password, conf_password
         }}
         validationSchema={registerValidation}
         onSubmit={()=>{
          signUpHandler()
         }}
         >
            {
              (form) => (
                <Form>
                  <LoginInput 
                  type="text"
                  name="name"
                  onChange={handleChange}
                  icon="user" placeholder="Full Name"/>
                  <LoginInput 
                  type="email"
                  name="email"
                  onChange={handleChange}
                  icon="email" placeholder="Email Address"/>
                  <LoginInput 
                  type="password"
                  name="password"
                  onChange={handleChange}
                  icon="password" placeholder="Password"/>
                  <LoginInput 
                  type="password"
                  name="conf_password"
                  onChange={handleChange}
                  icon="password" placeholder="Re-Type Password"/>
                  <CircledIconBtn type="submit" text="Sign up"/>
                </Form>
              )
            }
        </Formik>
          <div>{success && <span>{success}</span>}</div>
          <div>{error && <span>{error}</span>}</div>
          </div>
        </div>
      </div>
    <Footer/>
    </>
  )
}


export async function getServerSideProps(context:any) {
  let providers:any = await getProviders()
  providers = Object["values"](providers)
  
    return {
      props: {
        country: { name: "Thailand", flag: "https://cdn.britannica.com/38/4038-004-111388C2/Flag-Thailand.jpg"  },
        providers
      }
    }
    
}

