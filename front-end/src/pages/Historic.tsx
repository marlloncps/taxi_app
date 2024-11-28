import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { AutoCompleteProps, Driver, ErrorResponse } from "../shared/types";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import LoadingComponent from "../components/LoaderSpinner";
import HistoricRideComponent from "../components/HistoricRideComponent";
import dayjs from "dayjs";
import { House } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Historic() {
  const [driversOptions, setDriversOptions] = useState<AutoCompleteProps[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [selectedDriver, setSelectedDriver] =
    useState<AutoCompleteProps | null>(null);
  const [rides, setRides] = useState<any[]>([]);
  const navigate = useNavigate();

  const { isLoading } = useQuery(
    "drivers",
    async () => {
      const response = await axios.get("http://localhost:8080/drivers");
      return response.data;
    },
    {
      onSuccess: (data) => {
        const driversOptionsMapped: Array<AutoCompleteProps> = data.drivers.map(
          (driver: Driver) => ({
            label: driver.name,
            value: driver.id,
          })
        );
        driversOptionsMapped.unshift({ label: "Todos", value: 0 });
        setDriversOptions(driversOptionsMapped);
      },
      onError: (error) => {
        enqueueSnackbar(
          "Erro ao buscar motoristas, tente novamente mais tarde."
        );
        console.error("Error fetching drivers:", error);
      },
    }
  );

  const { mutate, isLoading: isLoadingRides } = useMutation(
    async () => {
      if (!customerId) {
        enqueueSnackbar(
          "Você precisa digitar um id de usuário para buscar as viagens!",
          {
            variant: "info",
          }
        );
      }

      const buildUrl = () => {
        const basePath = `http://localhost:8080/ride/${customerId}`;
        if (selectedDriver && selectedDriver.value !== 0) {
          return `${basePath}?driver_id=${selectedDriver.value}`;
        }
        return basePath;
      };

      const response = await axios.get(buildUrl());
      setRides(response.data);
      return response.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar("Histórico de viagens carregado com sucesso!", {
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        console.error("Erro ao buscar histórico de viagens:", error);
        enqueueSnackbar(
          error?.response?.data?.error_description ||
            "Erro ao buscar o histórico. Tente novamente mais tarde.",
          { variant: "error" }
        );
      },
    }
  );

  const handleCustomerFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerId(e.target.value);
  };

  const handleDriverChange = (
    _event: React.SyntheticEvent,
    newValue: AutoCompleteProps | null
  ) => {
    setSelectedDriver(newValue);
  };

  const handleSearch = () => {
    mutate();
  };

  return (
    <>
      <Box p={2}>
        <IconButton onClick={() => navigate("/")} sx={{ alignSelf: "center" }}>
          <House></House>
        </IconButton>
        <Typography textAlign={"center"} variant="h5">
          Histórico de viagens
        </Typography>
        <Typography textAlign={"center"} variant="subtitle2">
          Busque o histórico de viagens de um usuário, selecionando ou não um
          motorista para filtrar
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 3,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <TextField
            size="medium"
            autoFocus
            variant="filled"
            label="Id do Usuário"
            id="customerId"
            name="customerId"
            value={customerId}
            onChange={handleCustomerFieldChange}
          />

          <Autocomplete
            disablePortal
            options={driversOptions}
            sx={{ width: 300 }}
            disabled={isLoading}
            value={selectedDriver}
            onChange={handleDriverChange}
            renderInput={(params) => (
              <TextField {...params} label="Selecione um motorista" />
            )}
          />

          <Button variant="contained" onClick={handleSearch}>
            Filtrar
          </Button>
        </Box>
        <LoadingComponent loading={isLoadingRides} />
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {rides.map((ride) => (
            <HistoricRideComponent
              key={ride.id}
              id={ride.id}
              date={dayjs(ride.created_at).format("DD/MM/YYYY - HH:mm")}
              destination={ride.destination}
              driverName={ride.driver.name}
              duration={ride.duration}
              origin={ride.origin}
              value={ride.value}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
