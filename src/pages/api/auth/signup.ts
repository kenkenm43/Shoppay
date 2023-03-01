import { NextApiRequest, NextApiResponse } from "next";
import { validateEmail } from '../../../utils/validation'
import bcrypt from 'bcrypt'
import nc from 'next-connect'
import db from '../../../utils/db'
import User from '../../../models/User'
import { createActivationToken } from '../../../utils/tokens'
function onError(err:any, req:any, res:any, next:any) {
    console.log(err);
    // OR: console.error(err);
  
    res.status(500).end(err.toString());
    // OR: you may want to continue
    next();
  }
const handler = nc<NextApiRequest, NextApiResponse>({ onError  })


handler.post(async (req, res, next) => {
    try {
        await db.connectDb()
        console.log(req.body);
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({message: "Please fill in all fields."});
        }
        if (!validateEmail(email)) {
            return res.status(400).json({message: "Invalid email."});
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({message: "This email already exists."});
        }
        if (password.length < 6) return res.status(400).json({meesage: "Password must be at least 6 characters."})
        const cryptedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({name, email, password: cryptedPassword})
        const addedUser = await newUser.save()
        const activation_token = createActivationToken({
            id: addedUser._id.toString()
        })
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/activate/${activation_token}`
        res.status(200).send(url)
    } catch (e) { 
        next(onError(e,req,res,next));
    }
})

export default handler