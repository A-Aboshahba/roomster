import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Comp1, Comp2, Comp3, Comp4, Comp5, Comp6 } from '../../components/manageHousing/stepperComponents/intergrate.jsx';
import { Grid } from '@mui/material';
import ChooseAppartment from './../../components/manageHousing/stepperComponents/ChooseAppartment';
import HomeType from './../../components/manageHousing/stepperComponents/HomeType';
import TellGuests from './../../components/manageHousing/stepperComponents/TellGuests';
import TransferNow from './../../components/manageHousing/stepperComponents/TransferNow';
import AppartmentCard from '../../components/manageHousing/stepperComponents/AppartmentCard.jsx';


const steps = ['', '', '', '', '', '', '', '', '', ''];


const demo = [
    {
        component: <Comp1 />
    },
    {
        label: "Which of these best describes your place?",
        component: <ChooseAppartment />
    },
    {
        label: "whats is the type of your apartment",
        component: <HomeType />
    },
    {
        desc: "Your address is only shared with guests after they’ve made a reservation.",
        label: "Where is your place located?",
        component: <Comp2 />
    },
    {
        label: "Give us some basic information about your apartment",
        desc: "More details will be added later but these are the main ones..",
        component: <Comp3 />
    },
    {
        label: "What type of place will guests have?",
        component: <TellGuests />
    },
    {
        label: "Now let's choose an apartment title",
        desc: "Short titles are more effective, don't worry, you can change it later.",
        component: <Comp4 />
    },
    {
        label: "to transfer now to describe the apartment",
        desc: "Now let's move on to the description of the apartment Choose two things that characterize your dwelling that we will use to start writing a description",
        component: <TransferNow />
    },
    {
        label: "Now write a description of the apartment",
        desc: "Tell us what makes your apartment stand out from the rest.",
        component: <Comp5 />
    },
    {
        component: <Comp6 />
    },
];




export default function ManageHousing() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item display='flex' justifyContent="center" alignItems="center" flexDirection='column'>

                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 7, mb: 3, fontSize: 25 }}> All steps completed, This is your adds </Typography>
                        <AppartmentCard />
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{ width: "90%", mt: 7 }}>
                            <Typography sx={{ fontSize: 25, mb: 1, fontWeight: "bold" }}>{demo[activeStep].label}</Typography>
                            <Typography sx={{ fontSize: 17, mb: 2 }}>{demo[activeStep].desc}</Typography>
                            <Box >
                                {demo[activeStep].component}
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-between' }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Grid>
        </Grid>
    );
}
