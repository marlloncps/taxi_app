interface RideEstimateVerifyProps {
  customer_id: string;
  origin: string;
  destination: string;
}

export default function rideEstimateVerifyParams({
  customer_id,
  origin,
  destination,
}: RideEstimateVerifyProps) {
  if (!origin || !destination || !customer_id) {
    return {
      status: 400,
      message: "Endereço de origem, destino ou customer_id faltando",
    };
  }

  if (
    origin.trim() === "" ||
    destination.trim() === "" ||
    customer_id.trim() === ""
  ) {
    return {
      status: 400,
      message:
        'O formato do corpo da requisição está inválido. O formato correto é: { "customer_id": "string", "origin": "string", "destination": "string" }',
    };
  }

  if (origin === destination) {
    return {
      status: 400,
      message: "Os endereços não podem ser iguais!",
    };
  }
  return { status: 200 };
}
