import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Header from "../../../components/dashboardComponent/Header";
import GeographyChart from "../../../components/dashboardComponent/GeographyChart";
import BarChart from "../../../components/dashboardComponent/BarChart";
import StatBox from "../../../components/dashboardComponent/StatBox";
import ProgressCircle from "../../../components/dashboardComponent/ProgressCircle";
import { useSelector } from "react-redux";
import { getAllUserState } from "../../../store/Slices/AllUsersSlice";
import { getApartmentsState } from "../../../store/Slices/apartment";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const usersCount = useSelector(getAllUserState);
  const usersCount = 5;
  const apartemnts = useSelector(getApartmentsState);

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

  // console.log(totalPrice);
  // console.log(totalReservations);

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
            progress={totalReservations / 100}
            increase={`+${totalReservations / 100} %`}
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
            title={`${totalPrice * 0.01}$`}
            subtitle="Website Profits"
            progress={totalPrice * 0.00001}
            increase={`+${totalPrice * 0.00001}%`}
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
            <ProgressCircle progress={`${totalPrice / 100000}`} size="125" />
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
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
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
