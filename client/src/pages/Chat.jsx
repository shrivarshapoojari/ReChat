import React, { Fragment, useCallback, useEffect, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { useRef } from 'react'
import { AttachFileOutlined, Send } from '@mui/icons-material'
import { InputBox } from '../components/styles/StyledComponents'
import { grayColor } from '../constants/color'
import FileMenu from '../components/dialogs/FileMenu'
import Message from '../components/shared/Message'
 import { server } from '../constants/config'

import { getSocket } from '../socket'
import { ALERT, NEW_MESSAGE } from '../constants/events'
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/reducers/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { useErrors } from '../hooks/hook'
import { useInfiniteScrollTop } from "6pp";
import { setIsFileMenu } from '../redux/reducers/misc'
import { removeNewMessagesAlert } from '../redux/reducers/chat'
import { START_TYPING,STOP_TYPING } from '../constants/events'
import { TypingLoader } from '../components/layout/Loaders'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Chat = ({ chatId }) => {



const privateKey=localStorage.getItem('privateKey')
 

  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const [page, setPage] = useState(1)
  const [messages, setMessages] = useState([])
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);


  const user = useSelector((state) => state?.auth?.user)

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId })





  const decryptMessage = async (encryptedMessage) => {
    try {
      
      const privateKeyBase64 = localStorage.getItem("privateKey");
    
      const binaryPrivateKey = atob(privateKeyBase64);
    
      const privateKeyArrayBuffer = new Uint8Array([...binaryPrivateKey].map(char => char.charCodeAt(0)));
      
       
      const cryptoPrivateKey = await window.crypto.subtle.importKey(
        "pkcs8", 
        privateKeyArrayBuffer.buffer,
        {
          name: "RSA-OAEP",
          hash: "SHA-256"
        },
        true, 
        ["decrypt"]
      );
    
  
      const encryptedArrayBuffer = new Uint8Array(atob(encryptedMessage).split("").map(char => char.charCodeAt(0))).buffer;
    
     
      const decryptedArrayBuffer = await window.crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        cryptoPrivateKey,
        encryptedArrayBuffer
      );
   
      
      const decryptedMessage = new TextDecoder().decode(decryptedArrayBuffer);
    
      console.log("Decrypted message:", decryptedMessage);
      return decryptedMessage;
    } catch (error) {
       console.log(error)
    }
  };






  

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page }, { skip: !chatId })
   
  
  const modifyOldMessage = async () => {
    if (oldMessagesChunk?.data?.messages) {
    
      const modifiedMessages = await Promise.all(
        oldMessagesChunk.data.messages.map(async (message) => {
          
          const decryptedContent = await decryptMessage(message.content);
          return {
            ...message,
            content: decryptedContent,  
          };
        })
      );
  
    
      const modifiedOldMessagesChunk = {
        ...oldMessagesChunk,   
        data: {
          ...oldMessagesChunk.data,   
          messages: modifiedMessages,  
        },
      };
  
      return modifiedOldMessagesChunk;  
    }
  };
  const modifiedOldMessagesChunk=modifyOldMessage()
  console.log(modifiedOldMessagesChunk)
  
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    modifiedOldMessagesChunk?.data?.messages
  );


  const members = chatDetails?.data?.chat?.members
   
  const errors = [{ isError: chatDetails?.isError, error: chatDetails?.error },
  { isError: oldMessagesChunk?.isError, error: oldMessagesChunk?.error },
  ]
  useErrors(errors)
 
  const currentUserId = String(user._id);
  const otherusers = Array.isArray(members)
        ? members.filter(memberId => String(memberId) !== currentUserId) // Directly compare the string IDs
        : [];
 


         

        async function encryptMessage(publicKeyPem, message) {
          
          const cleanPem = publicKeyPem
            .replace(/-----BEGIN PUBLIC KEY-----/g, '')
            .replace(/-----END PUBLIC KEY-----/g, '')
            .replace(/\s+/g, ''); // Remove all line breaks and spaces
        
          try {
            // Decode the cleaned Base64 public key
            const binaryDerString = atob(cleanPem);
            const binaryDer = new Uint8Array([...binaryDerString].map(char => char.charCodeAt(0)));
        
            // Import the public key
            const cryptoPublicKey = await window.crypto.subtle.importKey(
              "spki", // Public Key format
              binaryDer.buffer,
              {
                name: "RSA-OAEP",
                hash: "SHA-256",
              },
              true,
              ["encrypt"]
            );
        
            // Encode the message
            const encodedMessage = new TextEncoder().encode(message);
        
            // Encrypt the message
            const encryptedMessage = await window.crypto.subtle.encrypt(
              { name: "RSA-OAEP" },
              cryptoPublicKey,
              encodedMessage
            );
        
            // Return the encrypted message as a Base64 string
            return btoa(String.fromCharCode(...new Uint8Array(encryptedMessage)));
          } catch (error) {
            console.error('Error during encryption:', error);
          }
        }
        
        
          














  const socket = getSocket();
  const [message, setMessage] = useState("")

  
  const submitHandler = async(e) => {
    e.preventDefault();
    if (!message.trim())
      return;
    const userId=otherusers[0]
    
    const res = await axios.get(`${server}/api/v1/user/getPublicKey`, {
      withCredentials: true,  
      params: {
        userId: userId, 
      },
    });
       
    const publicKey=res?.data?.publicKey
    const encrptedmsg=await encryptMessage(publicKey,message)  
  
    socket.emit(NEW_MESSAGE, { chatId, members, message:encrptedmsg })
    setMessage("")


  }

  
  







  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId))
    return () => {
      setMessage(""),
        setMessages([]),
        setPage(1),
        setOldMessages([])
    }
  }, [chatId])


  const newMessageHandler = useCallback(
    async(data) => {
    if (data?.chatId !== chatId)
      return
     const decryptedMessageContent=await decryptMessage(data?.message?.content)
     const decryptedMessage = {
      ...data?.message,
      content: decryptedMessageContent 
    };
  
    setMessages((prev) => [...prev, decryptedMessage]);
  }, [chatId])


  useEffect(() => {
    socket.on(NEW_MESSAGE,
      newMessageHandler



    )
    return () => {
      socket.off(NEW_MESSAGE, newMessageHandler)
    }
  }, [socket, newMessageHandler])




  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


 



  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true))
    setFileMenuAnchor(e.currentTarget);
  }

const messageChangeHandler=(e)=>{
  setMessage(e.target.value)
  if(!IamTyping){
  socket.emit(START_TYPING,{members,chatId})
  setIamTyping(true)
  }
  if(typingTimeout.current){
    clearTimeout(typingTimeout.current)
  }
 typingTimeout.current= setTimeout(()=>{
    socket.emit(STOP_TYPING,{members,chatId})
setIamTyping(false)


  },[2000])
}

const[IamTyping,setIamTyping]=useState(false)
const[userTyping,setUserTyping]=useState(false)
const typingTimeout=useRef(null)

const startTypingListener= useCallback((data)=>{
if(data.chatId!==chatId)
return
setUserTyping(true)

},[chatId])
const stopTypingListener= useCallback((data)=>{
  if(data.chatId!==chatId)
    return
 setUserTyping(false)

},[chatId])

useEffect(() => {
  socket.on(START_TYPING,
    startTypingListener



  )
  return () => {
    socket.off(START_TYPING, startTypingListener)
  }
}, [socket, startTypingListener])

useEffect(() => {
  socket.on(STOP_TYPING,
    stopTypingListener



  )
  return () => {
    socket.off(STOP_TYPING, stopTypingListener)
  }
}, [socket, startTypingListener])


const alertListener = useCallback(
 
  (data) => {
    console.log(data)
  
    if (data.chatId !== chatId) return;
    const messageForAlert = {
      content: data.message,
      sender: {
        _id: "djasdhajksdhasdsadasdas",
        name: "Admin",
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    
     
    
    setMessages((prev) => [...prev, messageForAlert]);
  },
  [chatId]
);

useEffect(() => {
  socket.on(ALERT, alertListener); 

  return () => {
    socket.off(ALERT, alertListener); // Clean up listener
  };
}, [socket, alertListener]); // Include alertListener as a dependency




const allMessages = [...oldMessages, ...messages];
 const navigate=useNavigate()






useEffect(()=>{
if(chatDetails.isError)
  return navigate("/")
},[chatDetails.isError])
  return chatDetails.isLoading ? <Skeleton /> : (
    <Fragment>
      <Stack
        ref={containerRef}

        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}

        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          backgroundImage: "linear-gradient(to right, #FFFFFF, #D4DFED)"
        }}
      >

        {/* Message */}
        

        {allMessages.map((message) => (
          <Message key={message?._id} message={message} user={user} />
        ))
        }
       
       {userTyping &&<TypingLoader/>}
        <div ref={bottomRef} />
      </Stack>

      <form
        style={{
          height: "10%",

        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}

        >

          <IconButton
            sx={{
              rotate: "30deg",
              position: "absolute",
              color: "white",
              left: "1.5rem",
            }}
            onClick={handleFileOpen}
          >

            <AttachFileOutlined />

          </IconButton>
          <InputBox placeholder='Type Messages Here' value={message} onChange={messageChangeHandler} />
          <IconButton
            type='submit'

            sx={{

              backgroundColor: "blue",
              marginLeft: "0.2rem",
              marginBottom: "0.2rem",
              "  &:hover": {



                backgroundColor: "darkblue"
              }

            }}>
            <Send />
          </IconButton>
        </Stack>


      </form>

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  )
}

export default AppLayout(Chat);
