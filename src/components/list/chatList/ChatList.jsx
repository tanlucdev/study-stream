import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect } from "react"
import { useState } from "react"
import { db } from "../../../lib/firebase"
import { useUserStore } from "../../../lib/useUserStore"
import AddUser from "./addUser/AddUser"
import "./chatList.scss"

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);

  const { currentUser } = useUserStore()
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const item = res.data().chats;

      const promises = item.map(async (item) => {
        const userDocRef = doc(db, "users", item.recieverId)
        const userDocSnap = await getDoc(userDocRef)

        const user = userDocSnap.data()

        return { ...item, user };

      })

      const chatData = await Promise.all(promises)
      setChats(chatData.sort((a, b) => b.updateAt - a.updateAt))
    });

    return () => {
      unSub()
    }
  }, [currentUser.id])

  console.log(chats);
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {chats.map((chat) => (

        <div className="item" key={chat.chatId}>
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Kento</span>
            <p>chat.lastMessage</p>
          </div>
        </div>

      ))}
      {addMode && <AddUser />}
    </div>
  )
}
