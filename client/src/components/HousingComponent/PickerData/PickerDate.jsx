/* eslint-disable react/prop-types */
import { useState } from "react";
import Stack from "@mui/material/Stack";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./PickerDate.css";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CurrencySign from "../../../utils/CurrencySign";
const PickerDate = ({ reservationsArr = [] ,price=1}) => {

  const SignySelector = useSelector((state) => state.currency.selected);
  const currencySelector = useSelector((state) => state.currency.currency);

  const disabledDays = [
    ...reservationsArr.map(date => {
      return { from: new Date(date.startDate), to: new Date(date.endDate) }
    }),
    { from: new Date(2022, 1, 1), to: new Date().setDate(new Date().getDate() - 1) }
  ];
  const [range, setRange] = useState();

  let footer = (
    <Typography color="primary" sx={{ textAlign: "center" }}>
      Please pick the first day.
    </Typography>
  );
  if (range?.from) {
    if (!range.to) {
      footer = (
        <p>
          <Button variant="contained" sx={{ background: "#d8ebc8" }}>
            {format(range.from, "P")}
          </Button>
        </p>
      );
    } else if (range.to) {
      const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
      const date1Obj = new Date(range.from);
      const date2Obj = new Date(range.to);
      const timeDiff = Math.abs(date2Obj.getTime() - date1Obj.getTime()); // Difference in milliseconds
      const diffDays = Math.round(timeDiff / oneDay) + 1; // Difference in days
      footer = (
        <>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "space-between", mt: 4 }}
          >
            <Button variant="contained" sx={{ background: "#d8ebc8" }}>
              {format(range.from, "P")}
            </Button>
            <Button variant="contained" sx={{ background: "#d8ebc8" }}>
              {format(range.to, "P")}
            </Button>
          </Stack>
          <Typography variant="body1" color="initial" sx={{ mt: 4 }}>
            {"total price : " + diffDays*price*currencySelector[SignySelector]}{' '}{CurrencySign[SignySelector]}
          </Typography>
        </>
      );
    }
  }
  return (
    <DayPicker
      id="test"
      mode="range"
      disabled={disabledDays}
      selected={range}
      footer={footer}
      onSelect={setRange}
      numberOfMonths={1}
      captionLayout="dropdown-buttons"
      fromYear={2023}
      toYear={2030}
    />
  );
};

export default PickerDate;
