import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function AppartmentCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="300"
        image="https://image1.apartmentfinder.com/i2/Z6Enu4m5wCo9y71uJBp3JIw_CtJAzGyvxhfymQpchCg/110/image.jpg"
      />
      <Box sx={{display:'flex', flexDirection:"column"}}>
        <Button size="large">Publishing</Button>
        <Button size="large">Edit</Button>
        <Button size="large">Remove Add</Button>
      </Box>
    </Card>
  );
}