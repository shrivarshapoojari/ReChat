import { Box, Typography } from '@mui/material'
import React , {memo} from 'react'
import moment from 'moment'
import { fileFormat } from '../../lib/features'
import RenderAttachment from './RenderAttachment'
import {motion } from 'framer-motion'
const Message = ({message,user}) => {

    const {sender,content,attachments=[],createdAt}=message
    const sameSender=sender._id===user._id
   
    const timeAgo=moment(createdAt).fromNow()
  return (
      <motion.div
          initial={{opacity:0,x:"-100%"}}
          whileInView={{opacity:1,x:0}}
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
                        const file=fileFormat(url)
                        return <Box key={index} >
                            <a href={url} target='_blank' download
                            style={
                                {
                                    color:"black"
                                }
                            }
                            >
                                  {RenderAttachment(file, url)}
                                </a>
                        </Box>

                        
                      }

                )
            )
        }
      <Typography variant='caption' color={"white"}>{timeAgo}</Typography>  

      </motion.div>
  )
}

export default memo(Message)
