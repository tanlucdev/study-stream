import React from 'react'
import List from '../../components/list/List'
import Chat from '../../components/chat/Chat'
import Detail from '../../components/detail/Detail'
import Login from '../../components/login/Login'
import Notification from '../../components/notification/Notification'
import './container.scss'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { useUserStore } from '../../lib/useUserStore'
import { useChatStore } from '../../lib/useChatStore'


export default function Container() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    })

    return () => {
      unSub()
    }
  }, [fetchUserInfo])

  if (isLoading) return <div className='loading'>Loading... </div>
  return (
    <div className='container'>
      {currentUser ? (
        <>
          <List />
          {console.log(chatId)}
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div >
  )
}
