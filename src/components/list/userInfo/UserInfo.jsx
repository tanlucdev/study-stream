import React from 'react'
import './userInfo.scss'
export default function UserInfo() {
  return (
    <div className='userInfo'>
      <div className='user'>
        <img src="./avatar.png" alt="" />
        <h2>Kento</h2>
      </div>
      <div className='icons'>
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />

      </div>
    </div>
  )
}
