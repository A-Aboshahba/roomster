import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import Typography from "@mui/material/Typography";
//
//
export default function CardReview({ item }) {
  console.log("called");

  return item === undefined ? (
    <></>
  ) : (
    <Card sx={{ mb: 4, boxShadow: 0 }}>
      <CardHeader
        avatar={
          <Avatar
            src={
              item.userId.image.url == ""
                ? "https://a0.muscache.com/im/pictures/user/96db5a52-52db-42d4-a8bf-fe4d9cb7901d.jpg?im_w=240"
                : item.userId.image.url
            }
          />
        }
        title={`${item.userId.fullName}`}
        subheader={`${moment(item.updatedAt).format("MMM YYYY")}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
