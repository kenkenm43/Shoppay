// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from 'mongodb'

if (!process.env.NEXT_PUBLIC_MONGODB_URL) {
  throw new Error('Invalid/Missing environment variable: "NEXT_PUBLIC_MONGODB_URL"')
}

const uri = process.env.NEXT_PUBLIC_MONGODB_URL
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let catched :any = global
  if (!catched._mongoClientPromise) {
    client = new MongoClient(uri, options)
    catched._mongoClientPromise = client.connect()
  }
  clientPromise = catched._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise