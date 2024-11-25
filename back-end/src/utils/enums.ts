export enum GetRouteMapTravelModes {
  Carro = "DRIVE",
  Todos = "TRAVEL_MODE_UNSPECIFIED",
  Bicicleta = "BICYCLE",
  Andando = "WALK",
  Motos = "TWO_WHEELER",
  Publico = "TRANSIT",
}

export enum ErrosCodeResponseEnum {
  InvalidData = "INVALID_DATA",
  DriverNotFound = "DRIVER_NOT_FOUND",
  InvalidDistance = "INVALID_DISTANCE",
  RouteNotFound = "NOT_FOUND_ROUTES",
  InternalServerError = "INTERNAL_SERVER_ERROR",
  InvalidDriver = "INVALID_DRIVER",
  RidesNotFound = "NO_RIDES_FOUND"
}
