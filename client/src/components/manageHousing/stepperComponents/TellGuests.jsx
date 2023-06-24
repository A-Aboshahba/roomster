import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SpaIcon from '@mui/icons-material/Spa';
import PoolIcon from '@mui/icons-material/Pool';
import StadiumIcon from '@mui/icons-material/Stadium';
import { display, styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBanSmoking, faBurger, faDumbbell, faFireBurner, faFireExtinguisher, faHotTubPerson, faHouseFire, faKitMedical, faMoneyBill, faMusic, faNetworkWired, faPersonSkiingNordic, faPrescriptionBottle, faShower, faTable, faUmbrellaBeach, faUtensils, faWater, faWaterLadder, faUniversalAccess } from '@fortawesome/free-solid-svg-icons';



const CustomBox = styled(Grid)({
  // Your default styles here
  width: "30%",
  height: 85,
  border: '2px solid #ddd',
  margin: "1%",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "12px",

  '&:hover': {
    borderColor: "#000",
  },
  '&.selected': {
    borderColor: "#000",
  }
});

const MaxWidthContainer = styled(Box)({
  maxWidth: '1px',
  fontSize: "3px",
});




let apartments = [
  {
    key: 1,
    icon: <WifiOutlinedIcon size="5x" />,
    title: "Wifi"
  },
  {
    key: 2,
    icon: <LiveTvIcon size="5x" />,
    title: "TV"
  },
  {
    key: 3,
    icon: <LocalLaundryServiceIcon size="5x" />,
    title: "Washer"
  },
  {
    key: 4,
    icon: <LocalParkingIcon size="5x" />,
    title: "Free parking on premises"
  },
  {
    key: 5,
    icon: <DirectionsCarFilledIcon size="5x" />,
    title: "Paid parking on premises"
  },
  {
    key: 6,
    icon: <AcUnitIcon size="5x" />,
    title: "Air conditioning"
  },
  {
    key: 7,
    icon: <FontAwesomeIcon icon={faNetworkWired} />,
    title: "Dedicated workspace"
  }
]


const stanOutAmenities = [
  {
    key: 1,
    icon: <FontAwesomeIcon icon={faWaterLadder} />,
    title: "Pool"
  },
  {
    key: 2,
    icon: <FontAwesomeIcon icon={faHotTubPerson} />,
    title: "Hot tube"
  },
  {
    key: 3,
    icon: <FontAwesomeIcon icon={faPrescriptionBottle} />,
    title: "Patio"
  },
  {
    key: 4,
    icon: <FontAwesomeIcon icon={faBurger} />,
    title: "BBQ grill"
  },
  {
    key: 5,
    icon: <FontAwesomeIcon icon={faUtensils} />,
    title: "Outdoor dining area"
  },
  {
    key: 6,
    icon: <FontAwesomeIcon icon={faFireBurner} />,
    title: "Fire Pit"
  },
  {
    key: 7,
    icon: <FontAwesomeIcon icon={faTable} />,
    title: "Pool table"
  },
  {
    key: 8,
    icon: <FontAwesomeIcon icon={faHouseFire} />,
    title: "Indoor fireplace"
  },
  {
    key: 9,
    icon: <FontAwesomeIcon icon={faMusic} />,
    title: "Piano"
  },
  {
    key: 10,
    icon: <FontAwesomeIcon icon={faDumbbell} />,
    title: "Exercise equipment"
  },
  {
    key: 11,
    icon: <FontAwesomeIcon icon={faWater} />,
    title: "Lake access"
  },
  {
    key: 12,
    icon: <FontAwesomeIcon icon={faUmbrellaBeach} />,
    title: "Beach access"
  },
  {
    key: 13,
    icon: <FontAwesomeIcon icon={faPersonSkiingNordic} />,
    title: "Ski-in/Ski-out"
  },
  {
    key: 14,
    icon: <FontAwesomeIcon icon={faShower} />,
    title: "Outdoor shower"
  },
]

const safetyItems = [
  {
    key: 1,
    icon: <FontAwesomeIcon icon={faBanSmoking} />,
    title: "Smoke alarm"
  },
  {
    key: 2,
    icon: <FontAwesomeIcon icon={faKitMedical} />,
    title: "First aid kit"
  },
  {
    key: 3,
    icon: <FontAwesomeIcon icon={faFireExtinguisher} />,
    title: "Fire extinguisher"
  },
  {
    key: 4,
    icon: <FontAwesomeIcon icon={faUniversalAccess} />,
    title: "Carbon monoxide alarm"
  },

]


const TellGuests = ({ collectedData, setCollectedData, setIsChoosed }) => {
  const [selectedItemId, setSelectedItemId] = useState();
  const [selectedItemId2, setSelectedItemId2] = useState();
  const [selectedItemId3, setSelectedItemId3] = useState();



  React.useEffect(() => {
    setIsChoosed(false);
  }, []);

  function handleClick1(id) {
    setSelectedItemId(id)
    setCollectedData({ ...collectedData, apartAdvantages: { ...collectedData.apartAdvantages, one: id } })
  }
  function handleClick2(id) {
    setSelectedItemId2(id)
    setCollectedData({ ...collectedData, apartAdvantages: { ...collectedData.apartAdvantages, two: id } })
  }
  function handleClick3(id) {
    setSelectedItemId3(id)
    setCollectedData({ ...collectedData, apartAdvantages: { ...collectedData.apartAdvantages, three: id } })
  }



  return (
    <Box>
      <Typography>You can add more after publishing your ad</Typography>
      <Grid maxWidth={800} container sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>
        {apartments.map((apart, i) => (
          <CustomBox item key={i}
            className={selectedItemId == apart.key ? 'selected' : ''}
            onClick={() => handleClick1(apart.key)}
          >
            <Box>{apart.icon}</Box>
            <Typography sx={{ textAlign: "center" }}>{apart.title}</Typography>
          </CustomBox>
        ))}
      </Grid>
      <Typography>You can add more after publishing your ad</Typography>
      <Grid maxWidth={800} container sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>
        {stanOutAmenities.map((apart, i) => (
          <CustomBox item key={i}
            className={selectedItemId2 == apart.key ? 'selected' : ''}
            onClick={() => handleClick2(apart.key)}
          >
            <Box>{apart.icon}</Box>
            <Typography sx={{ textAlign: "center" }}>{apart.title}</Typography>

          </CustomBox>
        ))}
      </Grid>
      <Typography>You can add more after publishing your ad</Typography>
      <Grid maxWidth={800} container sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>
        {safetyItems.map((apart, i) => (
          <CustomBox item key={i}
            className={selectedItemId3 == apart.key ? 'selected' : ''}
            onClick={() => handleClick3(apart.key)}
          >
            <Box>{apart.icon}</Box>
            <Typography sx={{ textAlign: "center" }}>{apart.title}</Typography>

          </CustomBox>
        ))}
      </Grid>
    </Box>
  )
}

export default TellGuests;
