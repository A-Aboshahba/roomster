import React from "react";

import Grid from "@mui/material/Grid";
import { CircularProgress, Divider, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Roomster from "../../API/config";
import "./MessagePage.css";
import Conversation from "../../components/MessagePageComponent/Conversation";
import { io } from "socket.io-client";
import Message from "../../components/MessagePageComponent/Message";
import { padding, width } from "@mui/system";
import { v4 as uuidv4 } from "uuid";
import { removeUnseen } from "../../store/Slices/userSlice";
import { useLocation } from "react-router-dom";

function MessagePage() {
  // { socket }
  const user = useSelector((state) => {
    return state.user?.user;
  });
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchString, setSearchString] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [friend, setFreiend] = useState(null);
  const scrollRef = useRef();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [unseenConversations, setUnseenConversations] = useState([]);
  const [openChat, setOpenChat] = useState(null);
  const conversationsBeforeSearch = useRef(null);
  const dipsatch = useDispatch();
  const location = useLocation();
  const socket = useSelector((state) => {
    return state.user?.socket;
  });
  const unseenConvo = useSelector((state) => {
    return state.user?.unseen;
  });
  useEffect(() => {
    if (
      conversations.length !== 0 &&
      conversationsBeforeSearch.current === null
    ) {
      console.log("saving initial conversations");
      conversationsBeforeSearch.current = [...conversations];
      console.log(conversationsBeforeSearch.current);
    }
    let searchedConversations = [];
    conversationsBeforeSearch.current?.forEach((conversation) => {
      conversation.members.forEach((member) => {
        if (
          !searchedConversations.includes(conversation) &&
          member.fullName.toLowerCase().includes(searchString.toLowerCase())
        ) {
          searchedConversations.push(conversation);
        }
      });
    });
    console.log(searchString);
    setConversations([...searchedConversations]);
    setCurrentChat(null);
  }, [searchString]);
  useEffect(() => {
    const openConversation = async (memberId) => {
      try {
        const response = await Roomster.post("conversations/" + user._id, {
          members: [memberId, user._id],
        });
        setOpenChat(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (location.state) {
      const { id } = location.state;
      openConversation(id);
    }
  }, [location.state]);

  useEffect(() => {
    currentChat?.members.map((member) => {
      if (arrivalMessage && member._id === arrivalMessage.senderId?._id) {
        setMessages((prev) => [...prev, arrivalMessage]);
      }
    });
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    let isExist = null;
    conversations.forEach((conversation) => {
      if (conversation?._id === openChat?._id) {
        isExist = conversation;
      }
    });
    if (isExist !== null) {
      setCurrentChat(isExist);
      setPage(1);
      setHasMore(true);
      setFreiend(isExist?.members.find((m) => m._id !== user._id));
      dipsatch(
        removeUnseen(isExist?.members.find((m) => m._id !== user._id)._id)
      );
      // console.log(isExist);
    } else {
      if (openChat !== null) {
        setConversations((prev) => [openChat, ...prev]);
        setCurrentChat(openChat);
        setPage(1);
        setHasMore(true);
        setFreiend(openChat?.members.find((m) => m._id !== user._id));
        dipsatch(
          removeUnseen(openChat?.members.find((m) => m._id !== user._id)._id)
        );
      }
    }
  }, [openChat, conversations]);
  // useEffect(() => {
  //   socket?.emit("getOnlineUsers");
  //   socket?.on("sentOnlineUsers", (users) => {
  //     setOnlineUsers(users);
  //   });
  //   socket?.on("getUsers", (users) => {
  //     setOnlineUsers(users);
  //   });
  //   console.log("onlineUsers", onlineUsers);
  // }, [user._id, socket, onlineUsers]);

  useEffect(() => {
    if (user._id != "") {
      const getConversations = async () => {
        try {
          const res = await Roomster.get("conversations/" + user._id);
          setConversations(res.data.data);
        } catch (err) {
          console.log(err);
        }
      };
      getConversations();

      const getUnseenConversaations = async () => {
        const response = await Roomster.get(
          `conversations/${user._id}/unseenConversations`
        );
        setUnseenConversations(response.data.conversationIds);
      };
      getUnseenConversaations();
    }
  }, [user._id]);
  useEffect(() => {
    socket?.on("getMessage", (data) => {
      let conversationExists = false;
      conversations.forEach((conversation) => {
        conversation.members.forEach((member) => {
          if (member._id === data.sender._id) {
            conversationExists = true;
          }
        });
      });
      if (conversationExists) {
        setArrivalMessage({
          senderId: data.sender,
          text: data.text,
          createdAt: Date.now(),
        });
      } else {
        const openConversation = async (memberId) => {
          try {
            const response = await Roomster.post("conversations/" + user._id, {
              members: [memberId, user._id],
            });
            setConversations((prev) => [response.data, ...prev]);
            setCurrentChat(response.data);
            setPage(1);
            setHasMore(true);
            setFreiend(response.data?.members.find((m) => m._id !== user._id));
            dipsatch(
              removeUnseen(
                response.data?.members.find((m) => m._id !== user._id)._id
              )
            );
          } catch (err) {
            console.log(err);
          }
        };
        openConversation(data.sender._id);
      }
    });
  }, [socket, currentChat]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await Roomster.get(
          `messages/${user?._id}/msg/${currentChat?._id}?limit=10&page=${page}`
        );
        setMessages(res.data.data.reverse());
        setPage(2);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentChat != null) getMessages();
  }, [currentChat, user?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  const cliclOnConversation = (conv) => {
    setCurrentChat(conv);
    setPage(1);
    setHasMore(true);
    setFreiend(conv?.members.find((m) => m._id !== user._id));
    dipsatch(removeUnseen(conv?.members.find((m) => m._id !== user._id)._id));
    try {
      Roomster.patch("conversations/" + user._id, {
        conversationId: conv._id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const loadMore = async () => {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);
    setPage(page + 1);
    const newData = await Roomster.get(
      `messages/${user?._id}/msg/${currentChat?._id}?limit=10&page=${page}`
    );
    if (newData.data.data.length === 0) {
      setHasMore(false);
    } else {
      setMessages((prevState) => [
        ...newData.data.data.reverse(),
        ...prevState,
      ]);
    }
    setLoading(false);
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat, arrivalMessage, messages]);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    // console.log(scrollHeight, scrollTop, clientHeight);
    if (scrollTop === 0) {
      loadMore();
    }
  };
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
            value={searchString}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          />

          <div className="conversation">
            {conversations.map((conv) => (
              <div key={conv._id} onClick={() => cliclOnConversation(conv)}>
                <Conversation
                  conversation={conv}
                  user={user}
                  unseen={unseenConvo}
                  // onlineUsers={onlineUsers}
                />
              </div>
            ))}
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
              <div className="messages-box" onScroll={handleScroll}>
                {messages.map((msg) => (
                  <div ref={scrollRef} key={uuidv4()}>
                    <Message
                      message={msg}
                      own={msg.senderId._id === user._id}></Message>
                  </div>
                ))}
                {loading && (
                  <div className="centerItem">
                    <CircularProgress />
                  </div>
                )}
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
                        sx={{ width: "80%", padding: "10px" }}
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
