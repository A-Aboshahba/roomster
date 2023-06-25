import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import Typography from "@mui/material/Typography";
//
//
export default function CardReview({ item }) {
  return item === undefined ? (
    <></>
  ) : (
    <Card sx={{ mb: 4, boxShadow: 0 }}>
      <CardHeader
        avatar={
          <Avatar
            src={
              item.userId.image?.url === ""
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4wVGjMQ37PaO4PdUVEAliSLi8-c2gJ1zvQ&usqp=CAU"
                : item.userId.image?.url
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
