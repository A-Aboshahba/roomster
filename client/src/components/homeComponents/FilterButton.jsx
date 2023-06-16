import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";


import HomeIcon from '@mui/icons-material/Home';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import CabinIcon from '@mui/icons-material/Cabin';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';
import { styled } from '@mui/system';



const CustomG = styled(Grid)({
  // Your default styles here
  width: "20%",
  height: 85,
  border: '2px solid #ddd',
  // margin: "0 2%",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "12px",

  '&:hover': {
    borderColor: "#000",
  },
});


const CustomGrid = styled(Grid)({
  border: '1px solid #ddd',
  margin: '0 4px',
  padding: '9px 0',
  borderRadius: '15px',
  width: '8%',
  textAlign: 'center',
  '&:hover': {
    borderColor: "#000",
  },
})


export default function FilterButton() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [name, setName] = React.useState('$ 10');



  let apartments = [
    {
      key: 1,
      icon: <HomeIcon />,
      title: "Home"
    },
    {
      key: 2,
      icon: <MapsHomeWorkIcon />,
      title: "apartment"
    },
    {
      key: 3,
      icon: <CabinIcon />,
      title: "Guest house"
    },
    {
      key: 8,
      icon: <NightShelterOutlinedIcon />,
      title: "Hotel"
    },
  ]







  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment >
      <Button
        sx={{
          border: "1px solid #ddd",
          justifyContent: "space-between",
          borderRadius: 2,
          textTransform: "capitalize",
          py: 1,
          color: "theme.palette.text.primary",
          textAlign: 'cnter',
          width: '100%',
          my: { xs: 4 },
        }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Filter
        <FilterAltOutlinedIcon />
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
                autoFocus
                value={maxWidth}
                onChange={handleMaxWidthChange}
                label="maxWidth"
                inputProps={{
                  name: "max-width",
                  id: "max-width",
                }}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Switch checked={fullWidth} onChange={handleFullWidthChange} />
              }
              label="Full width"
            />
          </Box>
        </DialogContent>
        <Divider sx={{
          width: '80%',
          margin: '0 auto',
        }} />


        <DialogTitle fontWeight="bold">Type of place</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The average nightly price is $248
          </DialogContentText>
          <DialogContentText>
            <Box
              component="form"
              sx={{
                display: "flex",
                m: "10px 0",
                width: "fit-content",
                '& > :not(style)': { m: 0.7, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-controlled"
                label="min price"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <TextField
                id="outlined-uncontrolled"
                label="max price"
                defaultValue="$ 830+"
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <Divider sx={{
          width: '80%',
          margin: '0 auto',
        }} />

        <DialogTitle fontWeight="bold">Price range</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              m: "10px 0",
              width: "fit-content",
            }}>
            <FormGroup sx={{display:'flex', gap:3}}>
              <FormControlLabel control={<Checkbox defaultChecked />} label={
                <Box>
                  <Typography>Entire place</Typography>
                  <span style={{ color: '#717171' }}>A place all to yourself</span>
                </Box>
              } />

              <FormControlLabel control={<Checkbox />} label={
                <Box>
                  <Typography>Shared room</Typography>
                  <span style={{ color: '#717171' }}> A sleeping space and common areas that may be shared with others</span>
                </Box>} />

              <FormControlLabel control={<Checkbox />} label={
                <Box>
                  <Typography>Room</Typography>
                  <span style={{ color: '#717171' }}>Your own room, plus access to shared spaces</span>
                </Box>} />
            </FormGroup>
          </Box>
        </DialogContent>
        <Divider sx={{
          width: '80%',
          margin: '0 auto',
        }} />


        <DialogTitle fontWeight="bold">Rooms and beds</DialogTitle>
        <DialogContent>
          <Grid container sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid sx={{ display: 'flex', }}>
              <CustomGrid bgcolor="#000" color="white">Any</CustomGrid>
              <CustomGrid item>
                1
              </CustomGrid>
              <CustomGrid item>
                2
              </CustomGrid>
              <CustomGrid item>
                3
              </CustomGrid>
              <CustomGrid item>
                4
              </CustomGrid>
              <CustomGrid item>
                5
              </CustomGrid>
              <CustomGrid item>
                6
              </CustomGrid>
            </Grid>
            <Grid sx={{ display: 'flex', }}>
              <CustomGrid bgcolor="#000" color="white">Any</CustomGrid>
              <CustomGrid item>
                1
              </CustomGrid>
              <CustomGrid item>
                2
              </CustomGrid>
              <CustomGrid item>
                3
              </CustomGrid>
              <CustomGrid item>
                4
              </CustomGrid>
              <CustomGrid item>
                5
              </CustomGrid>
              <CustomGrid item>
                6
              </CustomGrid>
            </Grid>
            <Grid sx={{ display: 'flex', }}>
              <CustomGrid bgcolor="#000" color="white">Any</CustomGrid>
              <CustomGrid item>
                1
              </CustomGrid>
              <CustomGrid item>
                2
              </CustomGrid>
              <CustomGrid item>
                3
              </CustomGrid>
              <CustomGrid item>
                4
              </CustomGrid>
              <CustomGrid item>
                5
              </CustomGrid>
              <CustomGrid item>
                6
              </CustomGrid>
            </Grid>
          </Grid>
        </DialogContent>


        <Divider sx={{
          width: '80%',
          margin: '0 auto',
        }} />

        <DialogTitle fontWeight="bold">Property type</DialogTitle>
        <DialogContent>
          <Grid container sx={{ display: 'flex', justifyContent: "space-evenly" }}>
            {apartments.map((apart, i) => (
              <CustomG item key={i}>
                <Box sx={{ fontSize: 3 }} >{apart.icon}</Box>
                <Typography sx={{ textAlign: "center" }}>{apart.title}</Typography>
              </CustomG>
            ))}
          </Grid>
        </DialogContent>

        <Divider sx={{
          width: '80%',
          margin: '0 auto',
        }} />

        <DialogTitle fontWeight="bold">Amenities</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex" }}>
            <FormGroup sx={{ width: "50%" }}>
              <FormControlLabel control={<Checkbox />} label="Wifi" />
              <FormControlLabel control={<Checkbox />} label="washer" />
              <FormControlLabel control={<Checkbox />} label="air conditioning" />
            </FormGroup>
            <FormGroup sx={{ width: "50%" }}>
              <FormControlLabel control={<Checkbox />} label="kitchen" />
              <FormControlLabel control={<Checkbox />} label="Dryer" />
              <FormControlLabel control={<Checkbox />} label="Heater" />
            </FormGroup>
          </Box>
        </DialogContent>


        <Divider sx={{
          width: '80%',
          margin: '0 auto',
        }} />

        <DialogTitle fontWeight="bold">Accessibility features</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex" }}>

            <FormGroup sx={{ width: "50%" }}>
              <FormControlLabel control={<Checkbox />} label="Step-free guest entrance" />
              <FormControlLabel control={<Checkbox />} label="Accessible parking spot" />
            </FormGroup>
            <FormGroup sx={{ width: "50%" }}>
              <FormControlLabel control={<Checkbox />} label="Guest entrance wider than 32 inches" />
              <FormControlLabel control={<Checkbox />} label="Step-free path to the guest entrance" />
            </FormGroup>
          </Box>
        </DialogContent>

        <Divider sx={{
          width: '80%',
          margin: '0 auto',
        }} />

        <DialogTitle fontWeight="bold">Host language</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex" }}>
            <FormGroup sx={{ width: "50%" }}>
              <FormControlLabel control={<Checkbox />} label="English" />
              <FormControlLabel control={<Checkbox />} label="French" />
            </FormGroup>
            <FormGroup sx={{ width: "50%" }}>
              <FormControlLabel control={<Checkbox />} label="German" />
              <FormControlLabel control={<Checkbox />} label="Japanese" />
            </FormGroup>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}



