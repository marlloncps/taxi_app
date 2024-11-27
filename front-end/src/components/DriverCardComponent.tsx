import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import {
  AttachMoney,
  DescriptionOutlined,
  DirectionsCar,
  PersonOutline,
  StarHalfOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ridesAtom } from "../shared/atoms";
import LoadingComponent from "./LoaderSpinner";

interface DriverCardComponentProps {
  index: number;
  name: string;
  vehicle: string;
  description: string;
  rate: string | number;
  value: string | number;
  rideDistance: number;
}

export default function DriverCardComponent({
  index,
  name,
  vehicle,
  description,
  rate,
  value,
  rideDistance,
}: DriverCardComponentProps) {
  const [rideData] = useRecoilState(ridesAtom);
  const navigate = useNavigate();
  const totalRideValue = +value * rideDistance;

  const { mutate, isLoading } = useMutation(
    async () => {
      const response = await axios.patch("http://localhost:8080/ride/confirm", {
        customer_id: rideData.customerId,
        origin: rideData.originAddress,
        destination: rideData.destinationAddress,
        distance: rideData.distance,
        duration: rideData.duration,
        driver: {
          id: index,
          name: name,
        },
        value: rideData.distance,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar(
          "Viagem confimada com sucesso, redirecionando para a tela de histórico.",
          { variant: "success" }
        );
        setTimeout(() => {
          navigate("/ride/historic");
        }, 1000);
      },
      onError: () => {
        enqueueSnackbar(
          `Erro ao selecionar corrida por favor selecione novamente o motorista ou tente novamente mais tarde!`,
          { variant: "error" }
        );
      },
    }
  );

  const handleSelectDriver = () => {
    console.log(rideData);
    mutate();
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Motorista {index}
        </Typography>
        <Box display={"flex"} mb={0.2} gap={0.2} alignItems={"center"}>
          <PersonOutline />
          <Typography variant="h6">{name}</Typography>
        </Box>
        <Box display={"flex"} mb={0.2} gap={0.2} alignItems={"flex-start"}>
          <DirectionsCar />
          <Typography>{vehicle}</Typography>
        </Box>
        <Box display={"flex"} mb={0.2} gap={0.2} alignItems={"flex-start"}>
          <DescriptionOutlined />
          <Typography variant="body2">{description}</Typography>
        </Box>
        <Box display={"flex"} mb={0.2} gap={0.2} alignItems={"flex-end"}>
          <StarHalfOutlined />
          <Typography variant="body2">{rate}/5</Typography>
        </Box>
        <Box display={"flex"} mb={0.2} gap={0.2} alignItems={"flex-end"}>
          <AttachMoney />
          <Typography variant="body2">R$ {value}.00 / km</Typography>
        </Box>
        <Box display={"flex"} mb={0.2} gap={0.2} alignItems={"flex-end"}>
          <AttachMoney />
          <Typography variant="body2">
            R$ {totalRideValue.toFixed(2)} valor total da corrida
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={handleSelectDriver}
        >
          Escolher
        </Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <>
      <Card
        variant="elevation"
        sx={{
          maxWidth: "300px",
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {card}
      </Card>
      <LoadingComponent loading={isLoading} />
    </>
  );
}
