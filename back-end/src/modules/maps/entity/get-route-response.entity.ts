export interface GetRouteResponse {
  data: {
    routes: [
      {
        distanceMeters: number;
        duration: string;
      },
    ];
  };
}
