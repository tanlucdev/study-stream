import './chat.scss'
import EmojiPicker from 'emoji-picker-react'
import { useEffect, useRef, useState } from 'react'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../../lib/useChatStore';
import { db } from '../../lib/firebase';
import { useUserStore } from '../../lib/useUserStore';
import { async } from '@firebase/util';

export default function Chat() {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const { currentUser } = useUserStore();
  const { chatId } = useChatStore();

  const endRef = useRef(null)

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "chats", chatId),
      (res) => {
        setChat(res.data());
      }
    )

    return () => {
      unSub();
    }
  }, [chatId])

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji)
    setOpen(false)
  }

  const handleSend = async () => {
    if (text === "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createAt: new Date(),
        })
      })
      const userIDS = [currentUser.id, user.id]
      userIDS.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id)
        const userChatsSnapshot = await getDoc(userChatsRef)

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data()

          const chatIndex = userChatsData.chats.findIndex(chats => chats.chatId === chatId)
          userChatsData[chatIndex].lastMessage = text
          userChatsData[chatIndex].isSeen =
            id === currentUser.id ? true : false
          userChatsData[chatIndex].updatedAt = Date.now()

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          })
        }
      })

    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Kento</span>
            <p>Hi im kento ne</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div className="message" key={message?.createAt}>
            {message.img && <img src={message.img} alt="" />}
            <div className="texts">
              <p>message.text</p>
              {/* <span>{message.text}</span> */}
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className='icons'>
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder='Type a message...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">

            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className='sendButton' onClick={handleSend}>Send</button>

      </div>
    </div>
  )
}
