import { AttachFileOutlined, Send } from '@mui/icons-material'
import { IconButton, Skeleton, Stack } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import FileMenu from '../components/dialogs/FileMenu'
import AppLayout from '../components/layout/AppLayout'
import Message from '../components/shared/Message'
import { InputBox } from '../components/styles/StyledComponents'

import { useInfiniteScrollTop } from "6pp"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ChatHeader from '../components/layout/ChatHeader'
import { ALERT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events'
import { useErrors } from '../hooks/hook'
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/reducers/api/api'
import { removeNewMessagesAlert } from '../redux/reducers/chat'
import { setIsFileMenu, setUserTyping } from '../redux/reducers/misc'
import { getSocket } from '../socket'
const Chat = ({ chatId }) => {


  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const [page, setPage] = useState(1)
  const [messages, setMessages] = useState([])
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);


  const user = useSelector((state) => state?.auth?.user)

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId })


  const oldMessagesChunk = useGetMessagesQuery({ chatId, page }, { skip: !chatId })


  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );


  const members = chatDetails?.data?.chat?.members
  const errors = [{ isError: chatDetails?.isError, error: chatDetails?.error },
  { isError: oldMessagesChunk?.isError, error: oldMessagesChunk?.error },
  ]
  useErrors(errors)





  const socket = getSocket();
  const [message, setMessage] = useState("")
  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim())
      return;
    socket.emit(NEW_MESSAGE, { chatId, members, message })
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


  const newMessageHandler = useCallback((data) => {
    if (data?.chatId !== chatId)
      return
    setMessages((prev) => [...prev, data?.message])
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

  const messageChangeHandler = (e) => 
    {
    setMessage(e.target.value)
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId })
      setIamTyping(true)
    }
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current)
    }
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId })
      setIamTyping(false)


    }, [2000])
  }

  const [IamTyping, setIamTyping] = useState(false)

  const typingTimeout = useRef(null)
  const {userTyping} = useSelector((state) => state.misc)
 

  const startTypingListener = useCallback((data) => {
    if (data.chatId !== chatId)
      return
    dispatch(setUserTyping(true))

  }, [chatId])

  const stopTypingListener = useCallback((data) => {
    if (data.chatId !== chatId)
      return
    dispatch(setUserTyping(false))

  }, [chatId])

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


      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
          sender:{
            name:"RECHAT"
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
  const navigate = useNavigate()

  useEffect(() => {
    if (chatDetails.isError)
      return navigate("/")

  }, [chatDetails.isError])
  return chatDetails.isLoading ? <Skeleton /> : (
    <Fragment>
      <ChatHeader chatId={chatId} />
      <Stack
        ref={containerRef}

        boxSizing={"border-box"}
        padding={"2rem"}
        spacing={"1rem"}
        width={"100%"}
        height={"80%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",

        }}
      >

        {/* Message */}


        {allMessages.map((message) => (
          <Message key={message?._id} message={message} user={user} />
        ))
        }

       
        <div ref={bottomRef} />
      </Stack>







      <form
        onSubmit={submitHandler}
        style={{
          height: "10%",
          padding: "0.5rem",
          borderRadius: "8px",
          // backgroundColor: "#f1f2f6",
          // boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack
          direction="row"
          height="100%"
          alignItems="center"
          spacing={2}
          sx={{
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            backgroundColor: "white",
            // boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <IconButton
            sx={{
              color: "#888",
              rotate: "30deg",
              transition: "transform 0.3s",
              "&:hover": {
                color: "#007bff",
                transform: "scale(1.1)",
              },
            }}
            onClick={handleFileOpen}
          >
            <AttachFileOutlined />
          </IconButton>

          <InputBox
            placeholder="Type messages here..."
            value={message}
            onChange={messageChangeHandler}
            style={{
              flexGrow: 1,
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              backgroundColor: "#f9f9f9",
              boxShadow: "inset 0px 1px 4px rgba(0, 0, 0, 0.1)",
              // border: "1px solid #ddd",
              color: "#333", // Set a visible text color
              fontSize: "1rem", // Ensure text is readable
            }}
          />

          <IconButton
            type="submit"
            sx={{
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "50%",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            <Send />
          </IconButton>
        </Stack>

        {/* File Menu */}
        <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
      </form>











    </Fragment>
  )
}

export default AppLayout(Chat);
