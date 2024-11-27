import { Box, Container, Typography } from "@mui/material";
import GoogleMapComponent from "../components/GoogleMapComponent";
import { useRecoilState } from "recoil";
import { ridesAtom } from "../shared/atoms";

export default function SelectDriver() {
  const [ridesData] = useRecoilState(ridesAtom);
  console.log(ridesData);
  return (
    <Container maxWidth={false}>
      <Typography variant="h4" textAlign={"center"}>
        Selecione um motorista para a rota traçada
      </Typography>
      <Box width={"100%"} sx={{ display: "flex", justifyContent: "center" }}>
        <GoogleMapComponent />
      </Box>
    </Container>
  );
}
