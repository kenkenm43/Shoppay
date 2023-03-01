import mongoose, { Schema } from 'mongoose'

interface IAddress {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address1: string;
    address2: string;
    city: string;
    zipCode: string;
    state: string;
    country: string;
    active: boolean;
}

const addressSchema = new Schema<IAddress>({
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    zipCode: { type: String },
    state: { type: String },
    country: { type: String },
    active: { type: Boolean, default: false },
})


const Address = mongoose.models.Address || mongoose.model("Address", addressSchema)

export default Address