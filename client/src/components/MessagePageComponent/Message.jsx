import React from "react";

import { useState } from "react";
import { styled } from "@mui/material/styles";
import { format } from "timeago.js";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import "./Message.css";
import { px } from "framer-motion";
import { Stack, padding } from "@mui/system";
function Message({ own, message }) {
  const [online, setOnline] = useState(true);
  console.log("message", message);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: online ? "#44b700" : "#eee",
      color: online ? "#44b700" : "#eee",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-top">
        {!own && (
          <Avatar
            alt="Remy Sharp"
            src={message.senderId.image.url}
            sx={{ width: 30, height: 30 }}
          />
        )}
        <p className="message-text">{message.text}</p>{" "}
        {own && (
          <Avatar
            alt="Remy Sharp"
            src={message.senderId.image.url}
            sx={{ width: 30, height: 30 }}
          />
        )}
      </div>
      <Typography mt={2} style={{ fontSize: "12px" }}>
        {format(message.createdAt)}
      </Typography>
    </div>
  );
}

export default Message;
