import React from "react";

import Grid from "@mui/material/Grid";
import { Divider, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./MessagePage.css";
import Conversation from "../../components/MessagePageComponent/Conversation";

import Message from "../../components/MessagePageComponent/Message";
import { padding, width } from "@mui/system";
function MessagePage() {
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
          {/* <TextField
          id="filled-basic"
          label="Search"
          color="success"
          variant="filled"
          style={{ width: "100%", margin: "0 0 10px 0" }}
          placeholder="search for friend"
        /> */}

          <div className="conversation">
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </Paper>
      </Grid>

      <Grid item xs={9} sm={8} md={8}>
        <Paper elevation={3}>
          <div className="messages">
            <CardHeader
              className="messages-top"
              avatar={
                <Avatar
                  alt="Remy Sharp"
                  src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4wVGjMQ37PaO4PdUVEAliSLi8-c2gJ1zvQ&usqp=CAU"
                  sx={{ width: 55, height: 55 }}
                />
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <Divider></Divider>
            <div className="messages-box">
              <Message own={true}></Message>
              <Message></Message>
              <Message own={true}></Message>
              <Message></Message>
              <Message own={true}></Message>
              <Message></Message>
              <Message own={true}></Message>
              <Message></Message>
              <Message own={true}></Message>
              <Message></Message>
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
                  justifyContent={"space-between"}
                >
                  <Grid item xs={10}>
                    <TextField
                      sx={{ width: "100%", padding: "10px" }}
                      id="standard-basic"
                      color="success"
                      variant="standard"
                      placeholder="type message"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      color="info"
                      variant="contained"
                      endIcon={<SendIcon />}
                      sx={{ color: "white", width: "90%", marginLeft: "10px" }}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MessagePage;
