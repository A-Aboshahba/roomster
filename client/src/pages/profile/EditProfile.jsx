import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function EditProfile() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: "2ch"}}>
                <Typography variant='h4' sx={{ m: 1 }}>Edit Profile</Typography>
                <div>
                    <TextField
                        label="First Name"
                        id="outlined-controlled"
                        value='ali'
                        sx={{
                            m: "1%", width: '48%', my:1
                        }}
                    />
                    <TextField
                        label="Last Name"
                        id="outlined-controlled"
                        value='ali'
                        sx={{
                            m: "1%", width: '48%', my:1
                        }}
                    />

                    <FormControl
                        sx={{
                            m: "1%", width: '98%', my:1
                        }} variant="outlined">
                        <InputLabel htmlFor="outlined-controlled">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-controlled"
                            value="llllllllllllll"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <FormControl sx={{
                        m: "1%", width: '98%', my:1
                    }}>
                        <InputLabel htmlFor="outlined-controlled">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-controlled"
                            value="khalid@gmail.com"
                            label="Email"
                        />
                    </FormControl>
                    <FormControl sx={{
                        m: "1%", width: '98%'
                    }}>
                        <InputLabel htmlFor="outlined-controlled">Address</InputLabel>
                        <OutlinedInput
                            id="outlined-controlled"
                            value="Cairo"
                            label="Address"
                        />
                    </FormControl>
                    <TextField
                        label="City"
                        id="outlined-controlled"
                        value='Cairo'
                        sx={{
                            m: "1%", width: '48%', my:1
                        }}
                    />
                    <TextField
                        label="State"
                        id="outlined-controlled"
                        value='Alex'
                        sx={{
                            m: "1%", width: '48%', my:1
                        }}
                    />
                    <FormControl sx={{
                        m: "1%", width: '98%', my:1
                    }}>
                        <InputLabel htmlFor="outlined-controlled">Contact Number</InputLabel>
                        <OutlinedInput
                            id="outlined-controlled"
                            value="01021451789"
                            label="Contact Number"
                        />
                    </FormControl>
                </div>
                <Box sx={{display:'flex', gap: '3ch', m:1}}>
                    <Button variant="contained" color="success">
                        Save
                    </Button>
                    <Button variant="outlined" color="error">
                        Cancel
                    </Button>
                </Box>
            </Box>
    );
}