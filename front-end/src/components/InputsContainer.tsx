import { Box, Button, TextField } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import LoadingComponent from "./LoaderSpinner";
import { enqueueSnackbar } from "notistack";
import { useRecoilState } from "recoil";
import { ridesAtom } from "../shared/atoms";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../shared/types";

export default function InputsContainer() {
  const navigate = useNavigate();
  const [, setRidesData] = useRecoilState(ridesAtom);
  const [formValues, setFormValues] = useState({
    customerId: "",
    origin: "",
    destination: "",
  });

  const { mutate, isLoading } = useMutation(
    async () => {
      const response = await axios.post("http://localhost:8080/ride/estimate", {
        customer_id: formValues.customerId,
        origin: formValues.origin,
        destination: formValues.destination,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setRidesData((prev) => ({
          ...prev,
          destination: data.destination,
          origin: data.origin,
          distance: data.distance,
          options: data.options,
          duration: data.duration,
          originAddress: formValues.origin,
          destinationAddress: formValues.destination,
          customerId: formValues.customerId,
        }));
        navigate("/ride");
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        enqueueSnackbar(
          `Erro: ${
            error.response?.data?.error_description || "Erro desconhecido"
          } por favor tente novamente!`,
          { variant: "error" }
        );
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    console.log("Valores do formulário:", formValues);
    mutate();
  };

  return (
    <>
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
          value={formValues.customerId}
          onChange={handleChange}
        />
        <TextField
          variant="filled"
          label="Endereço de origem"
          id="origin"
          name="origin"
          value={formValues.origin}
          onChange={handleChange}
        />
        <TextField
          variant="filled"
          label="Endereço de destino"
          id="destination"
          name="destination"
          value={formValues.destination}
          onChange={handleChange}
        />

        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </Box>
      <LoadingComponent loading={isLoading} />
    </>
  );
}
