import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import { AiTwotoneDelete } from "react-icons/ai";
import { Box } from "@mui/system";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";
import Roomster from "../../API/config";
import { useSelector } from "react-redux";
export default function CardReview({ item }) {
  const { user } = useSelector((state) => state.user);
  const handleDelete = (e, reviewId, userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want delete review",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Roomster.delete(`reviews/${reviewId}`, {
            data: {
              userId: userId,
            },
          });
          Swal.fire("Deleted!", "Your review has been deleted.", "success");
          e.target.closest(".reviewCard").remove();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  return item === undefined ? (
    <></>
  ) : (
    <Card
      className="reviewCard"
      sx={{ mb: 4, boxShadow: 0, position: "relative" }}
    >
      {item?.userId?.email === user?.email && (
        <AiTwotoneDelete
          size={30}
          fill="#8e0707"
          onClick={(e) => handleDelete(e, item._id, item.userId._id)}
          style={{
            position: "absolute",
            right: "0",
            top: "-50px",
            cursor: "pointer",
          }}
        />
      )}
      <CardHeader
        avatar={
          <Avatar
            src={
              item.userId?.image?.url === ""
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4wVGjMQ37PaO4PdUVEAliSLi8-c2gJ1zvQ&usqp=CAU"
                : item.userId?.image?.url
            }
          />
        }
        title={`${item.userId?.fullName}`}
        subheader={`${moment(item.updatedAt).format("MMM YYYY")}`}
      />
      <CardContent>
        <Rating
          name="half-rating-read"
          defaultValue={2.5}
          precision={0.5}
          readOnly
          value={item.rate}
        />
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
