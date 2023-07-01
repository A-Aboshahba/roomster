import React, { useState, useEffect } from "react";

import Divider from "@mui/material/Divider";
import moment from "moment";
import { styled } from "@mui/material/styles";

import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

import "./conversation.css";

function Conversation({ conversation, user }) {
  const [online, setOnline] = useState(true);
  const [friend, setFreiend] = useState(
    conversation.members.find((m) => m._id !== user._id)
  );

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
    <>
      <div className="card-conversation">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            sx={{ width: 55, height: 55 }}
            alt="Remy Sharp"
            src={friend.image.url}
          />
        </StyledBadge>
        <div className="title-content">
          <p className="title">{friend.fullName}</p>
          <p className="date">{`${moment(conversation.createdAt).format(
            " DD MMM YYYY "
          )}`}</p>
        </div>
      </div>

      <Divider variant="fullWidth" />
    </>
  );
}
// @media only screen and (max-width: 600px) {
//     .MuiCardHeader-root .MuiTypography-root {
//       display: none;
//     }
//   }
export default Conversation;
