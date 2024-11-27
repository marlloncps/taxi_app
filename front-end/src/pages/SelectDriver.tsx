import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import GoogleMapComponent from "../components/GoogleMapComponent";
import { useRecoilState } from "recoil";
import { ridesAtom } from "../shared/atoms";
import DriverCardComponent from "../components/DriverCardComponent";
import { AccessTime, LocationOn, MinorCrash } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";

export default function SelectDriver() {
  const [ridesData] = useRecoilState(ridesAtom);
  if (ridesData.options && ridesData.options.length === 0) {
    enqueueSnackbar("Não há motoristas disponíveis para essa corrida", {
      variant: "error",
    });
  }
  return (
    <Container maxWidth={false}>
      <Typography variant="h4" textAlign={"center"}>
        Selecione um motorista para a rota traçada
      </Typography>
      <Box
        width={"100%"}
        mb={3}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <GoogleMapComponent />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Informações da corrida
            </Typography>
            <Box display={"flex"} mb={0.2} gap={0.2} alignItems={"center"}>
              <LocationOn />
              <Typography variant="h6">{ridesData?.distance} Km</Typography>
            </Box>
            <Box display={"flex"} mb={0.2} gap={0.2} alignItems={"center"}>
              <AccessTime />
              <Typography variant="h6">{ridesData?.duration}</Typography>
            </Box>
            <Box display={"flex"} mb={0.2} gap={0.2} alignItems={"center"}>
              <MinorCrash />
              <Typography variant="h6">
                {ridesData?.options?.length ?? 0} disponíveis
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {ridesData.options &&
            ridesData.options.map((driver) => (
              <DriverCardComponent
                index={driver.id}
                name={driver.name}
                description={driver.description}
                rate={driver.review.rating}
                value={driver.value}
                vehicle={driver.vehicle}
                rideDistance={ridesData.distance}
              />
            ))}
        </Box>
      </Box>
    </Container>
  );
}
