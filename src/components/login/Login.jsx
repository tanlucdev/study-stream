import { useState } from 'react'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../../lib/firebase"
import upload from "../../lib/upload"

import { doc, setDoc, collection, where, getDocs, query } from "firebase/firestore"
import './login.scss'

export default function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  })

  const [loading, setLoading] = useState(false)

  const handleAvatar = e => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    const usersRef = collection(db, "users")
    const q = query(usersRef, where("email", "==", email))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      setLoading(false)
      return toast.warn("Email is unavailable")
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
    finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    // Kiểm tra input 
    if (!username) {
      setLoading(false)
      return toast.warn("Please enter username")
    }
    else if (!email) {
      setLoading(false)
      return toast.warn("Please enter email")
    } else if (!password) {
      setLoading(false)
      return toast.warn("Please enter password")
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      setLoading(false)
      return toast.warn("Password must be at least 6 characters long, contain at least one uppercase letter, and at least one digit.")
    }

    if (!avatar.file) {
      setLoading(false)
      return toast.warn("Please upload an avatar!")
    }
    // Kiểm tra username duy nhất 
    const usersRef = collection(db, "users")
    const q_user = query(usersRef, where("username", "==", username))
    const querySnapshot_user = await getDocs(q_user)
    if (!querySnapshot_user.empty) {
      setLoading(false)
      return toast.warn("Username was used")
    }

    const emailRef = collection(db, "users")
    const q_email = query(emailRef, where("email", "==", email))
    const querySnapshot_email = await getDocs(q_email)
    if (!querySnapshot_email.empty) {
      setLoading(false)
      return toast.warn("Email was used")
    }


    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const imgUrl = await upload(avatar.file)

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],

      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account created! You can login now.")
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login'>
      <div className="item">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Welcome back</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input type="file" id='file' style={{ display: "none" }} onChange={handleAvatar} />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          {console.log(loading)}
          <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  )
}
