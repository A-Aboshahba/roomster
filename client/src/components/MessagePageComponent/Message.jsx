import React from "react";

import { useState } from "react";
import { styled } from "@mui/material/styles";

import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import "./Message.css";
import { px } from "framer-motion";
import { Stack, padding } from "@mui/system";
function Message({ own }) {
  const [online, setOnline] = useState(true);

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
        <Avatar
          alt="Remy Sharp"
          src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4wVGjMQ37PaO4PdUVEAliSLi8-c2gJ1zvQ&usqp=CAU"
          sx={{ width: 30, height: 30 }}
        />

        <p className="message-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nulla
          itaque delectus unde doloribus fugiat explicabo repellendus, modi,
          temporibus voluptas ratione odio, beatae quo expedita architecto rem
          molestias nostrum repudiandae.
        </p>
      </div>
      <Typography mt={2} style={{ fontSize: "12px" }}>
        1 hour age
      </Typography>
    </div>
  );
}

export default Message;
