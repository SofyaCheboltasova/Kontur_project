import { Bike, Pagination } from './Api.types';

export class CatalogService {
  public async getBikes(page = 1, pointId = ''): Promise<Pagination<Bike>> {
    const res = await fetch(`/api/catalog/${pointId}?page=${page}`);
    return res.json();
  }

  public async getBike(bikeId: string): Promise<Bike> {
    const res = await fetch(`/api/catalog/bike/${bikeId}`);
    return res.json();
  }
}
