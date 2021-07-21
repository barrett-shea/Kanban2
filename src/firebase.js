import firebase from 'firebase/app'
import 'firebase/auth'


console.log(process.env.NODE_ENV)
console.log(process.env.REACT_APP_FIREBASE_API_KEY)
const app= firebase.initializaApp({
  apiKey: "AIzaSyC9shyVJuKnK5LhLQ7wYwhcvUyukJXm2AY",
  authDomain: "kanban-39624.firebaseapp.com",
  projectId: "kanban-39624",
  storageBucket: "kanban-39624.appspot.com",
  messagingSenderId: "439317602817",
  appId: "1:439317602817:web:3919cd3dc648eaa4a91600",
  measurementId: "G-SJH8K480C1"
})

export const auth = app.auth()
export default app
