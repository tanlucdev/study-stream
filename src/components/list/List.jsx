import React from 'react'
import "./list.scss"
import UserInfo from './userInfo/UserInfo'
import ChatList from './chatList/ChatList'

export default function List() {
  return (
    <div className='list'>
      <UserInfo />
      <ChatList />
    </div>
  )
}
