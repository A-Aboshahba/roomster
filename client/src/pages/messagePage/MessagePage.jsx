import React from "react";

import Grid from "@mui/material/Grid";
import { Divider, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Roomster from "../../API/config";
import "./MessagePage.css";
import Conversation from "../../components/MessagePageComponent/Conversation";
import { io } from "socket.io-client";
import Message from "../../components/MessagePageComponent/Message";
import { padding, width } from "@mui/system";
import { v4 as uuidv4 } from "uuid";
function MessagePage() {
  // { socket }
  const user = useSelector((state) => {
    return state.user?.user;
  });
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [friend, setFreiend] = useState(null);
  const scrollRef = useRef();

  const socket = useSelector((state) => {
    return state.user?.socket;
  });

  useEffect(() => {
    currentChat?.members.map((member) => {
      if (arrivalMessage && member._id === arrivalMessage.senderId?._id) {
        setMessages((prev) => [...prev, arrivalMessage]);
      }
    });
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    // socket.current.emit("addUser", user._id);
    socket?.on("getUsers", (users) => {
      setOnlineUsers(
        users
        // user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user, socket]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await Roomster.get("conversations/" + user._id);
        setConversations(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);
  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.sender,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await Roomster.get(
          `messages/${user?._id}/msg/${currentChat?._id}`
          // {
          //   // data: {
          //   conversationId: currentChat?._id,
          //   // },
          // }
        );
        setMessages(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentChat != null) getMessages();
  }, [currentChat, user?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    socket?.emit("sendMessage", {
      sender: user,
      receiverId: friend._id,
      text: newMessage,
    });

    try {
      const res = await Roomster.post("/messages/" + user._id, {
        senderId: user._id,
        conversationId: currentChat._id,
        text: newMessage,
      });
      setMessages([...messages, { ...res.data, senderId: user }]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={3} sm={4} md={4}>
        <Paper elevation={3} sx={{ padding: "10px" }}>
          <TextField
            id="standard-basic"
            label="search"
            color="success"
            variant="standard"
            style={{ width: "100%", margin: "0 0 10px 0" }}
            placeholder="search for friend"
          />

          <div className="conversation">
            {conversations.map((conv) => (
              <div
                key={conv._id}
                onClick={() => {
                  setCurrentChat(conv);
                  setFreiend(conv.members.find((m) => m._id !== user._id));
                }}>
                <Conversation conversation={conv} user={user} />
              </div>
            ))}

            {/* <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation /> */}
          </div>
        </Paper>
      </Grid>

      <Grid item xs={9} sm={8} md={8}>
        <Paper elevation={3}>
          {currentChat && (
            <div className="messages">
              <CardHeader
                className="messages-top"
                avatar={
                  <Avatar
                    alt="Remy Sharp"
                    src={friend.image.url}
                    // " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4wVGjMQ37PaO4PdUVEAliSLi8-c2gJ1zvQ&usqp=CAU"
                    sx={{ width: 55, height: 55 }}
                  />
                }
                title={friend.fullName}
                // subheader="September 14, 2016"
              />
              <Divider></Divider>
              <div className="messages-box">
                {messages.map((msg) => (
                  <div ref={scrollRef} key={uuidv4()}>
                    <Message
                      message={msg}
                      own={msg.senderId._id === user._id}></Message>
                  </div>
                ))}

                {/* <Message own={true}></Message>
              <Message></Message>
              <Message own={true}></Message>
              <Message></Message>
              <Message own={true}></Message>
              <Message></Message>
              <Message own={true}></Message>
              <Message></Message>
              <Message own={true}></Message>
              <Message></Message> */}
              </div>

              <div
                className="messages-bottom"
                //   style={{ padding: "10px 10px 10px 10px" }}
              >
                <Paper elevation={3}>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    width={"100%"}
                    justifyContent={"space-between"}>
                    <Grid item xs={10}>
                      <TextField
                        sx={{ width: "100%", padding: "10px" }}
                        id="standard-basic"
                        color="info"
                        variant="standard"
                        placeholder="type message"
                        value={newMessage}
                        onChange={(e) => {
                          setNewMessage(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        onClick={handleSubmit}
                        color="info"
                        style={{ backgroundColor: "#0695ff" }}
                        variant="contained"
                        endIcon={<SendIcon />}
                        sx={{
                          color: "white",
                          width: "95%",
                          marginLeft: "10px",
                        }}>
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MessagePage;