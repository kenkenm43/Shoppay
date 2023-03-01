import mongoose, { Schema } from 'mongoose'
import Address from './Address'

interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    image: string;
    emailVerified: boolean;
    defaultPaymentMethod: string;
    address: typeof Address[];
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Please enter your full name."],
    },
    email: {
        type: String,
        required: [true, "Please enter your email address."],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password."]
    },
    role: {
        type: String,
        default: "user"
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png"
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    defaultPaymentMethod: {
        type: String,
        default: ""
    },
    address: [
        { type: Schema.Types.ObjectId,
        ref: "Address"
        }
    ]
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User