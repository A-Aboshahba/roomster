import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Comp1, Comp2, Comp3, Comp4, Comp5, Comp6 } from '../../components/manageHousing/stepperComponents/intergrate.jsx';
import { Grid } from '@mui/material';
import ChooseAppartment from './../../components/manageHousing/stepperComponents/ChooseAppartment';
import TellGuests from './../../components/manageHousing/stepperComponents/TellGuests';
import AppartmentCard from '../../components/manageHousing/stepperComponents/AppartmentCard.jsx';
import { useState } from 'react';

const steps = ['', '', '', '', '', '', '', ''];






export default function ManageHousing() {
    const [activeStep, setActiveStep] = useState(5);
    const [skipped, setSkipped] = useState(new Set());
    const [isChoosed, setIsChoosed] = useState(true);

    const [collectedData, setCollectedData] = useState({
        choosePlace: "",
        placeLocation: {
            country: "",
            city: "",
            streetName: "",
            buildingNumber: "",

        },
        apartmentInformation: {
            guests: 0,
            bedrooms: 0,
            bathrooms: 0,
            kitchens: 0,
        },
        apartAdvantages: {
            one: "",
            two: "",
            three: "",
        },
        apartTitle: '',
        apartDescription: '',

    });

    const demo = [
        {
            component: <Comp1 setIsChoosed={setIsChoosed}/>
        },
        {
            label: "Which of these best describes your place?",
            component: <ChooseAppartment
                isChoosed={isChoosed} setIsChoosed={setIsChoosed}
                collectedData={collectedData} setCollectedData={setCollectedData} />
        },
        {
            desc: "Your address is only shared with guests after they’ve made a reservation.",
            label: "Where is your place located?",
            component: <Comp2
                setIsChoosed={setIsChoosed}
                collectedData={collectedData} setCollectedData={setCollectedData}
            />
        },
        {
            label: "Give us some basic information about your apartment",
            desc: "More details will be added later but these are the main ones..",
            component: <Comp3
                setIsChoosed={setIsChoosed}
                collectedData={collectedData} setCollectedData={setCollectedData}
            />
        },
        {
            label: "What type of place will guests have?",
            component: <TellGuests
                setIsChoosed={setIsChoosed}
                collectedData={collectedData} setCollectedData={setCollectedData}
            />
        },
        {
            label: "Now let's choose an apartment title",
            desc: "Short titles are more effective, don't worry, you can change it later.",
            component: <Comp4
                setIsChoosed={setIsChoosed}
                collectedData={collectedData} setCollectedData={setCollectedData}

            />
        },
        {
            label: "Now write a description of the apartment",
            desc: "Tell us what makes your apartment stand out from the rest.",
            component: <Comp5
                setIsChoosed={setIsChoosed}
                collectedData={collectedData} setCollectedData={setCollectedData}
            />
        },
        {
            component: <Comp6 />
        },
    ];

    console.log(collectedData)

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
            setIsChoosed(true)
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleFinish = () => {
        let newSkipped = skipped;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
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
                            {activeStep === steps.length - 1 ? (
                                <Button onClick={handleFinish}>
                                    Finish
                                </Button>
                            ) : (
                                <Button onClick={handleNext} disabled={isChoosed}>
                                    Next
                                </Button>
                            )}
                        </Box>
                    </React.Fragment>
                )}
            </Grid>
        </Grid>
    );
}