import './chat.scss'
import EmojiPicker from 'emoji-picker-react'
import { useEffect, useRef, useState } from 'react'

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null)

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji)
    setOpen(false)
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
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat soluta hic eius sed. Odit dolorem, ratione ipsam magni beatae, quaerat aperiam non accusamus laboriosam eveniet unde tempora nihil? Beatae, aperiam?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat soluta hic eius sed. Odit dolorem, ratione ipsam magni beatae, quaerat aperiam non accusamus laboriosam eveniet unde tempora nihil? Beatae, aperiam?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat soluta hic eius sed. Odit dolorem, ratione ipsam magni beatae, quaerat aperiam non accusamus laboriosam eveniet unde tempora nihil? Beatae, aperiam?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="https://images.pexels.com/photos/21936249/pexels-photo-21936249/free-photo-of-anh-sang-thanh-ph-t-i-toa-nha.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat soluta hic eius sed. Odit dolorem, ratione ipsam magni beatae, quaerat aperiam non accusamus laboriosam eveniet unde tempora nihil? Beatae, aperiam?</p>
            <span>1 min ago</span>
          </div>
        </div>
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
        <button className='sendButton'>Send</button>

      </div>
    </div>
  )
}
