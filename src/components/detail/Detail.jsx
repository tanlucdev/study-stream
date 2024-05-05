import React from 'react'
import './detail.scss'
import { auth, db } from "../../lib/firebase"
import { useUserStore } from '../../lib/useUserStore'
import { useChatStore } from '../../lib/useChatStore'
import { arrayRemove, arrayUnion, updateDoc, doc } from 'firebase/firestore'

export default function Detail() {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore()
  const { currentUser } = useUserStore()

  const handleBlock = async () => {
    if (!user) return
    const userDocRef = doc(db, "users", currentUser.id)

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      })
      changeBlock()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{isCurrentUserBlocked || isReceiverBlocked ? "user" : user?.username}</h2>
        <p>Lorem ipsum, dolor sit.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/5079604/pexels-photo-5079604.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                <span>Photo_2024.png</span>
              </div>
              <img src="./download.png" alt="" className='icon' />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/5079604/pexels-photo-5079604.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                <span>Photo_2024.png</span>
              </div>
              <img src="./download.png" alt="" className='icon' />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked ? "You are blocked!" : isReceiverBlocked ? "User blocked" : "Block User"}
        </button>
        <button className='logout' onClick={() => auth.signOut()}>Log out</button>
      </div>
      <div className="user"></div>
    </div>
  )
}
