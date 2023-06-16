import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function CardReview() {
  return (
    <Card sx={{ mb: 4, boxShadow: 0 }}>
      <CardHeader
        avatar={
          <Avatar src="https://a0.muscache.com/im/pictures/user/96db5a52-52db-42d4-a8bf-fe4d9cb7901d.jpg?im_w=240" />
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  );
}
