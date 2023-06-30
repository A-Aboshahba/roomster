import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { updateReview } from "../../store/Slices/apartment";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "70vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const EditReview = ({ item }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rate, setRate] = useState(item.rate);
  const [description, setDescription] = useState(item.description);
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(updateReview({ reviewId: item._id, rate, description }));
    setOpen(false);
  };
  return (
    <>
      <EditIcon color="primary" size={30} sx={{}} onClick={handleOpen} />
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h4"
            component="h2"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Edit Review
          </Typography>
          <Stack spacing={1} sx={{ mb: "2rem" }}>
            <label htmlFor="half-rating">Rate:</label>
            <Rating
              name="half-rating"
              defaultValue={rate}
              value={rate}
              precision={0.5}
              onChange={(e) => {
                setRate(e.target.value);
              }}
            />
          </Stack>
          <TextField
            id="outlined-multiline-static"
            label="review"
            multiline
            sx={{ width: "100%" }}
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box
            sx={{
              mt: "2rem",
              textAlign: "center",
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => handleEdit()}
            >
              Edit Review
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default React.memo(EditReview);
