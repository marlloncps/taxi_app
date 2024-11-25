import path from "path";
import dotenv from "dotenv";
import axios from "axios";
import { GetRouteResponse } from "./entity/get-route-response.entity";
import { GetRouteMapTravelModes } from "../../utils/enums";
import { GetRouteProps } from "./entity/get-route.entity";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

class MapsModel {
  private googleApiPath = `https://routes.googleapis.com/directions/v2:computeRoutes?key=${process.env.GOOGLE_API_KEY}`;

  async getRoute({
    origin,
    destination,
  }: GetRouteProps): Promise<GetRouteResponse> {
    const bodyGetRoute = {
      origin: {
        address: origin,
      },
      destination: {
        address: destination,
      },
      travelMode: GetRouteMapTravelModes.Carro,
    };

    const response = await axios.post(this.googleApiPath, bodyGetRoute, {
      headers: {
        "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
      },
    });
    return response;
  }
}

export default new MapsModel();
