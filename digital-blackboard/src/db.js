import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBPCSF20BXJ_qysy7MRnYpfwa08Yplo6sw",
    authDomain: "digital-blackboard-dhbw.firebaseapp.com",
    projectId: "digital-blackboard-dhbw",
    storageBucket: "digital-blackboard-dhbw.appspot.com",
    messagingSenderId: "354760127659",
    appId: "1:354760127659:web:1c3b9888bd88647a2fb3ee",
    measurementId: "G-F8VPDM77YE"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export default db