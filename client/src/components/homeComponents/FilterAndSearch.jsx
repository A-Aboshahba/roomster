import React from "react";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// react icons
import { locationsTab } from "../../data/allData";
import MaxWidthDialog from "./FilteModal";
import { Grid, useMediaQuery } from "@mui/material";

const FilterAndSearch = () => {
    const [value, setValue] = React.useState(0);
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    console.log(isSmallScreen);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container spacing={1} sx={{mb:3}} className="center">
            <Grid item xs={12} md={10} lg={11}>

                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons={true}
                        
                        sx={{
                            [`& .${tabsClasses.scrollButtons}`]: {
                                "&.Mui-disabled": { opacity: 0.3 },
                            },
                        }}
                    >
                        {locationsTab.map((tab) => {
                            return <Tab wrapped={true} key={tab.id} icon={tab.icon} label={tab.label} />;
                        })}
                    </Tabs>
            </Grid>
            <Grid item xs={12}  md={2} lg={1}>
                <MaxWidthDialog />
            </Grid>
        </Grid>
    );
};

export default FilterAndSearch;
