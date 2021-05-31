import admin from 'firebase-admin'

// eslint-disable-next-line
const serviceAccount = require(`./service-account.json`)

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE,
      databaseURL: process.env.FIREBASE_DATABASE,
    })
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack)
  }
}

const firestore = admin.firestore()
const storage = admin.storage()

export { firestore, storage }
export default admin
