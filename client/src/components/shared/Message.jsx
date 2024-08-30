import { Box, Typography } from '@mui/material'
import React , {memo} from 'react'
import moment from 'moment'
const Message = ({message,user}) => {

    const {sender,content,attachments=[],createdAt}=message
    const sameSender=sender._id===user._id
    const timeAgo=moment(createdAt).fromNow()
  return (
      <div
      style={
        {
            alignSelf: sameSender ? "flex-end" : "flex-start",
            backgroundColor: !sameSender ? "blue" : "grey",
            borderRadius: "1rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            color: "white",
            width: "fit-content",
           

        }
      }
      >
        {!sameSender && <Typography  color={"white"} fontWeight={"600"} variant='caption' >{sender.name}</Typography>}
        {content && <Typography > {content}</Typography>}
        {/* Attachment*/}

        {
            attachments.length>0 &&(
                attachments.map((attachment,index)=>

                      {
                        const url=attachment.url
                        const file="asd"
                        return <Box key={index} >
                            <a href={url} target='_blank' download
                            style={
                                {
                                    color:"black"
                                }
                            }
                            />
                        </Box>

                        
                      }

                )
            )
        }
      <Typography variant='caption' color={"white"}>{timeAgo}</Typography>  

      </div>
  )
}

export default memo(Message)
