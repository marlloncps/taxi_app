import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import {
  AccessTime,
  AttachMoney,
  LocationOn,
  LocationSearching,
  PersonOutline,
} from "@mui/icons-material";

export interface HistoricRideComponentProps {
  id: number;
  date: string;
  driverName: string;
  origin: string;
  destination: string;
  duration: string;
  value: number;
}

export default function HistoricRideComponent({
  id,
  date,
  driverName,
  origin,
  destination,
  duration,
  value,
}: HistoricRideComponentProps) {
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="subtitle2" textAlign={"center"} gutterBottom>
          Data da viagem {id}: {date}
        </Typography>
        <Box display={"flex"} mb={0.2} gap={0.2} alignItems={"center"}>
          <PersonOutline />
          <Typography variant="subtitle1">{driverName}</Typography>
        </Box>
        <Box display={"flex"} mb={0.2} gap={0.2} alignItems={"center"}>
          <LocationOn />
          <Typography variant="subtitle2">{origin}</Typography>
        </Box>
        <Box display={"flex"} mb={0.2} gap={0.2} alignItems={"center"}>
          <LocationSearching />
          <Typography variant="subtitle2">{destination}</Typography>
        </Box>
        <Box display={"flex"} mb={0.2} gap={0.2} alignItems={"center"}>
          <AccessTime />
          <Typography variant="subtitle2">{duration}</Typography>
        </Box>
        <Box display={"flex"} mb={0.2} gap={0.2} alignItems={"flex-end"}>
          <AttachMoney />
          <Typography variant="subtitle2">
            R$ {value} valor total da corrida
          </Typography>
        </Box>
      </CardContent>
    </React.Fragment>
  );

  return (
    <>
      <Card
        variant="elevation"
        sx={{
          // maxWidth: "300px",
          // minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {card}
      </Card>
    </>
  );
}
