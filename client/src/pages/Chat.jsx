import React, { Fragment, useCallback, useEffect, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { useRef } from 'react'
import { AttachFileOutlined, Send } from '@mui/icons-material'
import { InputBox } from '../components/styles/StyledComponents'
import { grayColor } from '../constants/color'
import FileMenu from '../components/dialogs/FileMenu'
import Message from '../components/shared/Message'

import { getSocket } from '../socket'
import { NEW_MESSAGE } from '../constants/events'
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/reducers/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { useErrors } from '../hooks/hook'
import { useInfiniteScrollTop } from "6pp";
import { setIsFileMenu } from '../redux/reducers/misc'
import { removeNewMessagesAlert } from '../redux/reducers/chat'
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


  const allMessages = [...oldMessages, ...messages];



  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true))
    setFileMenuAnchor(e.currentTarget);
  }



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
          <InputBox placeholder='Type Messages Here' value={message} onChange={(e) => setMessage(e.target.value)} />
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
