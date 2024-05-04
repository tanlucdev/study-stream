import React from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { database } from '../../lib/firebase'
import { toast } from 'react-toastify'
import Notification from '../notification/Notification'

export default function Reset_password() {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailVal = e.target.email.value;
    console.log("email value:", emailVal)
    sendPasswordResetEmail(database, emailVal).then(data => {
      toast.success("Check your email!")
    }).catch(err => {
      toast.error(err.code)
    })
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
