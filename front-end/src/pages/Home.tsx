import { Container, Typography } from "@mui/material";
import InputsContainer from "../components/InputsContainer";

export default function Home() {
  
  return (
    <Container maxWidth={false}>
      <Typography variant="h4" textAlign={"center"}>
        Bem vindo ao Taxi APP
      </Typography>
      <InputsContainer />
    </Container>
  );
}
