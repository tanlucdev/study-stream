import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect } from "react"
import { useState } from "react"
import { db } from "../../../lib/firebase"
import { useUserStore } from "../../../lib/useUserStore"
import AddUser from "./addUser/AddUser"
import "./chatList.scss"
import { useChatStore } from "../../../lib/useChatStore"

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data()?.chats;
      console.log(items);
      const promises = items?.map(async (item) => {
        console.log("Oke 4")

        const userDocRef = doc(db, "users", item.receiverID)
        console.log(userDocRef)

        const userDocSnap = await getDoc(userDocRef)

        const user = userDocSnap.data()

        return { ...item, user };

      })

      const chatData = await Promise?.all(promises)
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
    });

    return () => {
      unSub()
    }
  }, [currentUser.id])

  const handleSelect = async (chat) => {
    console.log("chat.chatId: ", chat.chatId)
    console.log("chat.user: ", chat.user)

    changeChat(chat.chatId, chat.user)
  }
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
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
        >
          <img src={chat.user.avatar} alt="" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>

      ))}
      {addMode && <AddUser />}
    </div>
  )
}
