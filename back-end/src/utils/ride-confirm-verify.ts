import { ConfirmRideProps } from "src/modules/ride-confirm/ride-confirm.service";

export default function rideConfirmVerifyParams({
  customer_id,
  origin,
  destination,
  distance,
  duration,
  driver,
  value,
}: ConfirmRideProps) {
  if (
    !customer_id ||
    !origin ||
    !destination ||
    !distance ||
    !duration ||
    !driver ||
    !value
  ) {
    return {
      status: 400,
      message:
        "Faltando parâmetros obrigatórios: customer_id, origin, destination, distance, duration, driver ou value.",
    };
  }

  if (
    typeof customer_id !== "string" ||
    typeof origin !== "string" ||
    typeof destination !== "string" ||
    typeof distance !== "number" ||
    typeof duration !== "string" ||
    typeof value !== "number" ||
    typeof driver !== "object" ||
    typeof driver.id !== "number" ||
    typeof driver.name !== "string"
  ) {
    return {
      status: 400,
      message: "O formato de um ou mais campos da requisição está incorreto",
    };
  }

  if (
    customer_id.trim() === "" ||
    origin.trim() === "" ||
    destination.trim() === ""
  ) {
    return {
      status: 400,
      message:
        'O formato do corpo da requisição está inválido. O formato correto é: { "customer_id": "string", "origin": "string", "destination": "string", "distance": number, "duration": "string", "driver": { "id": number, "name": "string" }, "value": number }',
    };
  }

  if (origin === destination) {
    return {
      status: 400,
      message: "Os endereços de origem e destino não podem ser iguais!",
    };
  }

  return { status: 200 };
}
