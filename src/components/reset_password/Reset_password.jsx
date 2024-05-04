import React from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { database } from '../../lib/firebase'
import { toast } from 'react-toastify'
import Notification from '../notification/Notification'
import { db } from '../../lib/firebase'

export default function Reset_password() {

  const checkEmailRegistered = async (email) => {
    // Lấy tất cả người dùng
    const usersRef = collection(db, 'users')
    const querySnapshot = await getDocs(usersRef)

    // Tìm kiếm trong mảng các email
    const foundUser = querySnapshot.docs.find(doc => {
      const userData = doc.data()
      const userEmail = userData.email
      return userEmail === email
    })
    // Nếu email được tìm thấy, trả về true; ngược lại, trả về false
    return !!foundUser
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailVal = e.target.email.value
    console.log(">>>> emailVal: ", emailVal)
    const emailRegistered = await checkEmailRegistered(emailVal)
    console.log("emailRegistered: ", emailRegistered)
    if (!emailRegistered) {
      toast.error("Email is not registered.")
    } else {
      sendPasswordResetEmail(database, emailVal).then(data => {
        toast.success("Check your email!")
      }).catch(err => {
        toast.error(err.code)
      })
    }
  }

  return (
    <div className='reset_password'>
      <h1>Forgot password</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="email" name="email" /> <br />
        <button>Reset</button>
      </form>
      <Notification />

    </div>
  )
}
