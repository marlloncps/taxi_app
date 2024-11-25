import { GetRouteProps } from "./entity/get-route.entity";
import mapsModel from "./maps.model";

class MapsService {
  async getMapsRoute({ origin, destination }: GetRouteProps) {
    const response = await mapsModel.getRoute({ origin, destination });
    return response;
  }
}

export default new MapsService();
