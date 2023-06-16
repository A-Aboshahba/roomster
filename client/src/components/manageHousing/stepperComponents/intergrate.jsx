/* eslint-disable react/no-unescaped-entities */
import { Autocomplete, Box, Divider, Grid, IconButton, TextField, TextareaAutosize, Typography } from '@mui/material';
import  { useState } from 'react'
import { countries } from './countries.jsx';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdRemoveCircleOutline } from 'react-icons/md';
import image1 from "../../../assets/c0634c73-9109-4710-8968-3e927df1191c.webp"
import image2 from "../../../assets/bfc0bc89-58cb-4525-a26e-7b23b750ee00.webp"




function Comp1() {
  return (
    <Box display="flex" justifyContent="center">
      <Grid container spacing={8} style={{ overflow: 'hidden' }}>
        <Grid item xs={12} md={4} >
          <Typography variant="h4" align="center" style={{ fontFamily: 'Montserrat' }}>It is easy to get started on Roomster</Typography>
          <img src="https://cdn.dribbble.com/users/9969/screenshots/3625570/housebuild.gif" style={{ maxWidth: "100%", height: "auto" }} />
        </Grid>
        <Grid item xs={12} md={8} container direction="column" spacing={6} >
          <Grid item>
            <Box display="flex" alignItems="center" >
              <img src={image1} alt='Roomster Step 1' width={150} height={120} />
              <div>
                <Typography variant="h5" style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>1. Tell us about your place</Typography>
                <Typography variant="body1" color="textSecondary" style={{ marginLeft: '10px' }}>
                  Share some basic info, like where it is and how many guests can stay.
                </Typography>
              </div>
            </Box>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              <img src={image2} alt="Roomster Step 2" width={150} height={120} />
              <div>
                <Typography variant="h5" style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>2. Make it stand out</Typography>
                <Typography variant="body1" color="textSecondary" style={{ marginLeft: '10px' }}>
                  Add 5 or more photos plus a title and description—we’ll help you out.
                </Typography>
              </div>
            </Box>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              <img src={image2} alt="Roomster Step 3" width={150} height={120} />
              <div>
                <Typography variant="h5" style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>3. Finish up and publish</Typography>
                <Typography variant="body1" color="textSecondary" style={{ marginLeft: '10px' }}>
                  Choose if you would like to start with an experienced guest, set a starting price and publish your listing.
                </Typography>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}


function Comp2() {
  return (
    <Grid container display="flex" justifyContent="center" >
      <Grid item xs={12} sm={12} md={12}>
        <Autocomplete
          id="country-select-demo"
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.label} ({option.code}) +{option.phone}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
            />
          )}
        />
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
          style={{ marginTop: 10 }}
        >
          <TextField fullWidth label="Enter The City" id="City" />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
          style={{ marginTop: 10 }}
        >
          <TextField fullWidth label="Street Name" id="Street" />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
          style={{ marginTop: 10 }}
        >
          <TextField fullWidth label="Building Number" id="Building" />
        </Box>
      </Grid>
    </Grid>
  );
}


function Comp3() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);

  const updateCount = (value, box) => {
    if (box === 1 && count1 + value >= 0) {
      setCount1(count1 + value);
    } else if (box === 2 && count2 + value >= 0) {
      setCount2(count2 + value);
    }
    else if (box === 3 && count3 + value >= 0) {
      setCount3(count3 + value);
    } else if (box === 4 && count4 + value >= 0) {
      setCount4(count4 + value);
    }
  };

  return (
    <Grid container display="flex" justifyContent="center" direction='column' alignItems='center'>
      <Grid container display="flex" justifyContent="space-between" direction='row' alignItems='center'  style={{ marginBottom: 13, marginTop: 30 }}>
        <Typography style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: 25 }} variant="h5">Guests</Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <IconButton color="primary" onClick={() => updateCount(1, 1)}>
            <AiOutlinePlusCircle />
          </IconButton>
          <span style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'serifs', marginRight: 1, marginLeft: 1 }}>{count1}</span>
          <IconButton color="secondary" onClick={() => updateCount(-1, 1)}>
            <MdRemoveCircleOutline />
          </IconButton>
        </Box>
      </Grid>
        <Divider sx={{width:{md:"100%", sm:'100%', xs:'100%'}}}/>

      <Grid container display="flex" justifyContent="space-between" direction='row' alignItems='center'  style={{ marginBottom: 13 }} >
        <Typography variant="h5" style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: 25 }}>Bedrooms</Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <IconButton color="primary" onClick={() => updateCount(1, 2)}>
            <AiOutlinePlusCircle />
          </IconButton>
          <span style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'serifs', marginRight: 1, marginLeft: 1 }}>{count2}</span>
          <IconButton color="secondary" onClick={() => updateCount(-1, 2)}>
            <MdRemoveCircleOutline />
          </IconButton>
        </Box>

      </Grid>
      <Divider sx={{width:{md:"100%", sm:'100%', xs:'100%'}}} />
      <Grid container display="flex" justifyContent="space-between" direction='row' alignItems='center'  style={{ marginBottom: 13 }}>
        <Typography variant="h5" style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: 25 }}>Bathrooms</Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <IconButton color="primary" onClick={() => updateCount(1, 3)}>
            <AiOutlinePlusCircle />
          </IconButton>
          <span style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'serifs', marginRight: 1, marginLeft: 1 }}>{count3}</span>
          <IconButton color="secondary" onClick={() => updateCount(-1, 3)}>
            <MdRemoveCircleOutline />
          </IconButton>
        </Box>
      </Grid>
      <Divider sx={{width:{md:"100%", sm:'100%', xs:'100%'}}} />
      <Grid container display="flex" justifyContent="space-between" direction='row' alignItems='center'  >
        <Typography variant="h5" style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: 25 }} >Kitchens</Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <IconButton color="primary" onClick={() => updateCount(1, 4)}>
            <AiOutlinePlusCircle />
          </IconButton>
          <span style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'serifs', marginRight: 1, marginLeft: 1 }}>{count4}</span>
          <IconButton color="secondary" onClick={() => updateCount(-1, 4)}>
            <MdRemoveCircleOutline />
          </IconButton>
        </Box>
      </Grid>

    </Grid>
  );
}


function Comp4() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };
  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item xs={12} sm={12} md={12}>
        <Box width="100%" textAlign="center">

          <TextareaAutosize
            aria-label="minimum height"
            rows={6}
            placeholder="Enter your title here"
            value={text}
            onChange={handleChange}
            style={{ height: '300px', width: '100%', fontSize: 20, borderWidth: 2, borderColor: 'green' }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}


function Comp5() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };
  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item xs={12} sm={12} md={12}>
        <Box width="100%" textAlign="center">
          <TextareaAutosize
            aria-label="minimum height"
            rows={6}
            placeholder="Enter your apartment description here"
            value={text}
            onChange={handleChange}
            style={{ height: '300px', width: '100%', fontSize: 20, borderWidth: 2, borderColor: 'green' }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}


function Comp6() {
  return (
    <Box display="flex" justifyContent="center" >
      <Grid container spacing={6} style={{ overflow: 'hidden' }}>
        <Grid item xs={12} md={6}>
          <img src="https://cdn.dribbble.com/users/152834/screenshots/2200351/bpd-steps.gif" style={{ maxWidth: "100%", height: "auto" }} />
        </Grid>
        <Grid item xs={12} md={6} container direction="column" spacing={6} >
          <Grid item >
            <Box display="flex" alignItems="center" flexDirection='column' >
              <Typography variant="h5" style={{ fontFamily: 'Comfortaa', fontSize: 40, fontWeight: 700, marginBottom: '80px' }}> Completion and publication</Typography>
              <Typography variant="body1" color="textSecondary" style={{ fontSize: 20, marginLeft: '10px' }}>Finally, you will choose if you want to start with an experienced guest, and then you will set the price per night,Answer a few quick questions and post your ad when you're ready
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}



export { Comp1, Comp2, Comp3, Comp4, Comp5, Comp6 };