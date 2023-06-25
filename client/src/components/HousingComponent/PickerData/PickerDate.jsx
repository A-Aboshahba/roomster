import { useState } from "react";
import Stack from "@mui/material/Stack";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./PickerDate.css";
import { Button, Typography } from "@mui/material";
const PickerDate = ({ reservationsArr = [] }) => {
  const disabledDays = [
    ...reservationsArr.map((date) => {
      return { from: new Date(date.startDate), to: new Date(date.endDate) };
    }),
    {
      from: new Date(2022, 1, 1),
      to: new Date().setDate(new Date().getDate() - 1),
    },
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
      footer = (
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Button variant="contained" sx={{ background: "#d8ebc8" }}>
            {format(range.from, "P")}
          </Button>
          <Button variant="contained" sx={{ background: "#d8ebc8" }}>
            {format(range.to, "P")}
          </Button>
        </Stack>
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
