import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { styled } from '@mui/system';
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





let apartments = [
  {
    key: 1,
    attr: "hasWifi",
    icon: <WifiOutlinedIcon size="5x" />,
    title: "Wifi"
  },
  {
    key: 2,
    attr: "hasTv",
    icon: <LiveTvIcon size="5x" />,
    title: "TV"
  },
  {
    key: 3,
    attr: "hasWasher",
    icon: <LocalLaundryServiceIcon size="5x" />,
    title: "Washer"
  },
  {
    key: 4,
    attr: "hasFreeParking",
    icon: <LocalParkingIcon size="5x" />,
    title: "Free parking on premises"
  },
  {
    key: 5,
    attr: "hasPaidParking",
    icon: <DirectionsCarFilledIcon size="5x" />,
    title: "Paid parking on premises"
  },
  {
    key: 6,
    attr: "hasAirConditioning",
    icon: <AcUnitIcon size="5x" />,
    title: "Air conditioning"
  },
  {
    key: 7,
    attr: "hasDedicatedWorkspace",
    icon: <FontAwesomeIcon icon={faNetworkWired} />,
    title: "Dedicated workspace"
  }
]

const stanOutAmenities = [
  {
    key: 1,
    attr: "hasPool",
    icon: <FontAwesomeIcon icon={faWaterLadder} />,
    title: "Pool"
  },
  {
    key: 2,
    attr: "hasHotTub",
    icon: <FontAwesomeIcon icon={faHotTubPerson} />,
    title: "Hot tube"
  },
  {
    key: 3,
    attr: "hasPatio",
    icon: <FontAwesomeIcon icon={faPrescriptionBottle} />,
    title: "Patio"
  },
  {
    key: 4,
    attr: "hasBBQgrill",
    icon: <FontAwesomeIcon icon={faBurger} />,
    title: "BBQ grill"
  },
  {
    key: 5,
    attr: "hasOutdoorDiningArea",
    icon: <FontAwesomeIcon icon={faUtensils} />,
    title: "Outdoor dining area"
  },
  {
    key: 6,
    attr: "hasFirePit",
    icon: <FontAwesomeIcon icon={faFireBurner} />,
    title: "Fire Pit"
  },
  {
    key: 7,
    attr: "hasPoolTable",
    icon: <FontAwesomeIcon icon={faTable} />,
    title: "Pool table"
  },
  {
    key: 8,
    attr: "hasIndoorFirePlace",
    icon: <FontAwesomeIcon icon={faHouseFire} />,
    title: "Indoor fireplace"
  },
  {
    key: 9,
    attr: "hasPiano",
    icon: <FontAwesomeIcon icon={faMusic} />,
    title: "Piano"
  },
  {
    key: 10,
    attr: "hasExerciseEquipment",
    icon: <FontAwesomeIcon icon={faDumbbell} />,
    title: "Exercise equipment"
  },
  {
    key: 11,
    attr: "hasLakeAccess",
    icon: <FontAwesomeIcon icon={faWater} />,
    title: "Lake access"
  },
  {
    key: 12,
    attr: "hasBeachAccess",
    icon: <FontAwesomeIcon icon={faUmbrellaBeach} />,
    title: "Beach access"
  },
  {
    key: 13,
    attr: "hasSkiInSkiOut",
    icon: <FontAwesomeIcon icon={faPersonSkiingNordic} />,
    title: "Ski-in/Ski-out"
  },
  {
    key: 14,
    attr: "hasOutdoorShower",
    icon: <FontAwesomeIcon icon={faShower} />,
    title: "Outdoor shower"
  },
]

const safetyItems = [
  {
    key: 1,
    attr: "hasSmokeAlarm",
    icon: <FontAwesomeIcon icon={faBanSmoking} />,
    title: "Smoke alarm"
  },
  {
    key: 2,
    attr: "hasFirstAidKit",
    icon: <FontAwesomeIcon icon={faKitMedical} />,
    title: "First aid kit"
  },
  {
    key: 3,
    attr: "hasFireExtinguisher",
    icon: <FontAwesomeIcon icon={faFireExtinguisher} />,
    title: "Fire extinguisher"
  },
  {
    key: 4,
    attr: "hasCarbonMonoxideAlarm",
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

  function handleClick1(id, attr) {
    setSelectedItemId(id)
    setCollectedData({ ...collectedData, apartAdvantages: { ...collectedData.apartAdvantages, [attr]: true } })
  }
  function handleClick2(id, attr) {
    setSelectedItemId2(id)
    setCollectedData({ ...collectedData, apartAdvantages: { ...collectedData.apartAdvantages, [attr]: true } })
  }
  function handleClick3(id, attr) {
    setSelectedItemId3(id)
    setCollectedData({ ...collectedData, apartAdvantages: { ...collectedData.apartAdvantages, [attr]: true } })
  }



  return (
    <Box>
      <Typography>Tell your guests what tour place has to offer</Typography>
      <Grid maxWidth={800} container sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>
        {apartments.map((apart, i) => (
          <CustomBox item key={i}
            className={selectedItemId == apart.key ? 'selected' : ''}
            onClick={() => handleClick1(apart.key, apart.attr)}
          >
            <Box>{apart.icon}</Box>
            <Typography sx={{ textAlign: "center" }}>{apart.title}</Typography>
          </CustomBox>
        ))}
      </Grid>
      <Typography>Do you have any standout amenities</Typography>
      <Grid maxWidth={800} container sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>
        {stanOutAmenities.map((apart, i) => (
          <CustomBox item key={i}
            className={selectedItemId2 == apart.key ? 'selected' : ''}
            onClick={() => handleClick2(apart.key, apart.attr)}
          >
            <Box>{apart.icon}</Box>
            <Typography sx={{ textAlign: "center" }}>{apart.title}</Typography>

          </CustomBox>
        ))}
      </Grid>
      <Typography>Do you have any of these safety items</Typography>
      <Grid maxWidth={800} container sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>
        {safetyItems.map((apart, i) => (
          <CustomBox item key={i}
            className={selectedItemId3 == apart.key ? 'selected' : ''}
            onClick={() => handleClick3(apart.key, apart.attr)}
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
