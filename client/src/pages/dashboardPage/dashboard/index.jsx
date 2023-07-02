import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Header from "../../../components/dashboardComponent/Header";
import GeographyChart from "../../../components/dashboardComponent/GeographyChart";
import StatBox from "../../../components/dashboardComponent/StatBox";
import ProgressCircle from "../../../components/dashboardComponent/ProgressCircle";
import {  useSelector } from "react-redux";
import { getApartmentsState } from "../../../store/Slices/apartment";
import { getAllUserState } from "../../../store/Slices/AllUsersSlice";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const usersCount = useSelector(getAllUserState).length;
  console.log(usersCount);
  const apartemnts = useSelector(getApartmentsState);
  console.log(apartemnts);

  let totalReservations = 0;
  apartemnts.forEach((apartment) => {
    apartment.reservationsArr.forEach((reservation) => {
      totalReservations++;
    });
  });

  let totalPrice = 0;
  apartemnts.forEach((apartment) => {
    apartment.reservationsArr.forEach((reservation) => {
      totalPrice += reservation.totalPrice;
    });
  });

  const mostResApartemnt =apartemnts.reduce((acc,curr)=>{
    if(curr.reservationsArr.length>acc.length){
      return curr
    }
    else{
    return acc;
    }
    },[])

  // console.log(totalPrice);
  // console.log(totalReservations);
  // console.log(mostResApartemnt);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="center" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={usersCount}
            subtitle="All Users"
            progress={usersCount / 1000}
            increase={`+${usersCount / 200} %`}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={apartemnts.length}
            subtitle="All Apartments"
            progress={apartemnts.length / 100}
            increase={`+${apartemnts.length / 100} %`}
            icon={
              <ApartmentIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalReservations}
            subtitle="All Reservation"
            progress={totalReservations / 10000}
            increase={`+${totalReservations / 10000} %`}
            icon={
              <AddBusinessIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${totalPrice * 0.004} $`}
            subtitle="Website benefits"
            progress={(totalPrice * 0.004)/ totalPrice}
            increase={`+${(totalPrice * 0.004)/ totalPrice}%`}
            icon={
              <AttachMoneyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle progress={`${totalPrice / 1000000}`} size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              ${totalPrice} revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          alignItems="center"
          justifyContent="center"
        >
            <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          
          >
          Most Reserved 
          </Typography>
          <Typography
              variant="h6"
              fontWeight="600"
              sx={{ padding: "20px" }}>
                Title: <span style={{ color: colors.greenAccent[600],marginLeft:"7px" }}>{mostResApartemnt.title}</span>
          </Typography>
          <Typography
              variant="h6"
              fontWeight="600"
              sx={{ padding: "20px" }}>
                Type: <span style={{ color: colors.greenAccent[600],marginLeft:"7px" }}>{mostResApartemnt.type}</span>
          </Typography>
          <Typography
              variant="h6"
              fontWeight="600"
              sx={{ padding: "20px" }}>
                Cost / Night : <span style={{ color: colors.greenAccent[600],marginLeft:"7px" }}>{mostResApartemnt.price} $</span>
          </Typography>
          <Typography
              variant="h6"
              fontWeight="600"
              sx={{ padding: "20px" }}>
                Owner : <span style={{ color: colors.greenAccent[600],marginLeft:"7px" }}>{mostResApartemnt.user?.fullName}</span> 
          </Typography>

        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
