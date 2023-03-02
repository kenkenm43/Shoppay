import nodemailer from  "nodemailer";
import {google} from 'googleapis'
import { activateEmailTemplate } from "@/emails/activateEmailTemplate";
import { GetAccessTokenResponse } from "google-auth-library/build/src/auth/oauth2client";

const { OAuth2 } = google.auth

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground"

const {
    NEXT_PUBLIC_MAILING_SERVICE_CLIENT_ID,
    NEXT_PUBLIC_MAILING_SERVICE_CLIENT_SECRET,
    NEXT_PUBLIC_MAILING_SERVICE_REFRESH_TOKEN,
    NEXT_PUBLIC_SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
    NEXT_PUBLIC_MAILING_SERVICE_CLIENT_ID,
    NEXT_PUBLIC_MAILING_SERVICE_CLIENT_SECRET,
    OAUTH_PLAYGROUND
)

//send email
export const sendEmail = (to:any, url:any, text:any, subject:any) => {
    oauth2Client.setCredentials({
        refresh_token: NEXT_PUBLIC_MAILING_SERVICE_REFRESH_TOKEN
    })
    const accessToken: any = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: NEXT_PUBLIC_SENDER_EMAIL_ADDRESS,
                clientId: NEXT_PUBLIC_MAILING_SERVICE_CLIENT_ID,
                clientSecret: NEXT_PUBLIC_MAILING_SERVICE_CLIENT_SECRET,
                refreshToken: NEXT_PUBLIC_MAILING_SERVICE_REFRESH_TOKEN,
                accessToken: accessToken.token || ''
            },
          }
    )
    const mailOptions = {
        from: NEXT_PUBLIC_SENDER_EMAIL_ADDRESS,
        to: to,
        subject: subject,
        html: activateEmailTemplate(to, url)
    }
    smtpTransport.sendMail(mailOptions, (err:any,infos:any) => {
        if (err) return err;
        return infos
    })
}