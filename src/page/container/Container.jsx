import React from 'react'
import List from '../../components/list/List'
import Chat from '../../components/chat/Chat'
import Detail from '../../components/detail/Detail'
import './container.css'

export default function Container() {
  return (
    <div className='container'>
      <List />
      <Chat />
      <Detail />
    </div>
  )
}
