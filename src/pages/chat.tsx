import { useEffect, useMemo, useState } from 'react';
import socketIo, { Socket } from "socket.io-client";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../types/reducer-types';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import Message from '../components/message';
import { FaMessage } from 'react-icons/fa6';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

interface MessageType {
    id: string;
    message:{
        userId: string;
        text: string;
        timestamp: Date;
    };
  }

const ENDPOINT = import.meta.env.VITE_SERVER;
const LIMIT = 10;
//let count=0;

const Chat = () => {
    //socket = socketIo(ENDPOINT, { transports: ['websocket'] });
    //socket.emit('loadMessages', { page: 0, limit: LIMIT });

    const [count, setCount] = useState(0);

    useMemo(() => {
        if (count === 0) {
            socket = socketIo(ENDPOINT, { transports: ['websocket'] });
            socket.emit('loadMessages', { page: 0, limit: LIMIT });
            setCount(1); // Ensure this only runs once
        }
    }, [count]);

    const [id, setid] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [page, setPage] = useState(0);

    const [messages,setMessages] = useState<MessageType[]>([]);

  const {user} = useSelector((state:{userReducer: UserReducerInitialState})=> state.userReducer);


    const send = () => {
        if (newMessage.trim()) {
            const message = {
              userId: user?._id,
              text: newMessage,
              timestamp: new Date(),
            };
        socket.emit('newMessage',  {message,id} );
        setNewMessage("");
        }
    }

    const loadMoreMessages = () => {
        socket.emit('loadMessages', { page: page + 1, limit: LIMIT });

        socket.on('loadMessages', (loadedMessages) => {
            const newMessages = loadedMessages.map((item: { userId: string; text: string; _id: string; timeStamp: Date; __v: Number; }) => ({
                message: {
                    text: item.text,
                    userId: item.userId,
                    timestamp: item.timeStamp,
                },
                id: item.userId
            }));
            
            setMessages(prevMessages => [...newMessages,...prevMessages]);
        })
        setPage(page + 1);
      };

    useEffect(() => {
        

        socket.on('connect', () => {
            setid(String(socket.id));
        })
        
    
    // Listen for loaded messages
    socket.on('loadMessages', (loadedMessages) => {
        const newMessages = loadedMessages.map((item: { userId: string; text: string; _id: string; timeStamp: Date; __v: Number; }) => ({
            message: {
                text: item.text,
                userId: item.userId,
                timestamp: item.timeStamp,
            },
            id: item.userId
        }));
        
        setMessages(prevMessages => [...prevMessages, ...newMessages]);
    })

        return () => {
            socket.off();
        }
    }, [])

    useEffect(() => {

        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
        })
        return () => {
            socket.off();
        }
    }, [messages])

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <ReactScrollToBottom className="chatBox">
                    <div className='load-more'>
                    <button onClick={loadMoreMessages}><FaMessage className='icon' /></button>
                    </div>
                {
                messages.map((item,i) => <Message key={i+1} user={String(user?.name)} message={item.message.text} classs={(item.id === user?._id || item.id === id ) ? 'right' : 'left'} />)
                } 
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn">SEND</button>
                </div>
            </div>

        </div>
    )
}

export default Chat
