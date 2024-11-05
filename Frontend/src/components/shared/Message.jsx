import { Avatar, Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import moment from 'moment'
import React, { memo, useEffect, useState } from 'react'
import { fileFormat } from '../../lib/features'
import RenderAttachment from './RenderAttachment'

const Message = ({ message, user }) => {
    const { sender, content, attachments = [], createdAt } = message
  
    const sameSender = sender?._id === user?._id
    const timeAgo = moment(createdAt).fromNow()
    const [avatar, setAvatar] = useState(sender?.name?.charAt(0)?.toUpperCase())

    useEffect(() => {
        if (sender?.avatar?.url) {
            setAvatar(sender.avatar.url)
        }
    }, [sender])

    return (
        <Box
            display="flex"
            alignItems="flex-start"
            
            mb={2}
            sx={{
                flexDirection: sameSender ? 'row-reverse' : 'row' ,
               
            }}
        >
            {/* Avatar */}
            {!sameSender && (
                <Avatar
                    alt={sender?.name}
                    sx={{ mr: 2, bgcolor: "blue" }}
                    src={avatar?.startsWith("http") ? avatar : undefined}
                >
                    {!avatar?.startsWith("http") && avatar}
                </Avatar>
            )}

            <motion.div
                initial={{ opacity: 0, x: sameSender ? "100%" : "-100%" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                    alignSelf: sameSender ? "flex-end" : "flex-start",
                    backgroundColor: sameSender ? "#4a76a8" : "#dfe7fd",
                    color: sameSender ? "white" : "#333",
                    borderRadius: "18px",
                    padding: "1rem",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    maxWidth: "100%",
                    wordWrap: "break-word",
                }}
            >
                {!sameSender && (
                    <Typography color="#333" fontWeight="600" variant="caption">
                        {sender?.name}
                    </Typography>
                )}
                {content && (
                    <Typography
                        variant="body2"
                        style={{ color: sameSender ? "white" : "#333" }}
                    >
                        {content}
                    </Typography>
                )}

                {/* Attachments */}
                {attachments.length > 0 && (
                    attachments.map((attachment, index) => {
                        const url = attachment.url
                        const file = fileFormat(url)
                        return (
                            <Box key={index} mt={1}>
                                <a href={url} target="_blank" download style={{ color: sameSender ? "lightblue" : "blue" }}>
                                    {RenderAttachment(file, url)}
                                </a>
                            </Box>
                        )
                    })
                )}

                <Typography variant="caption" color={sameSender ? "#cccccc" : "#555"} mt={1}>
                    {timeAgo}
                </Typography>
            </motion.div>
        </Box>
    )
}

export default memo(Message)
