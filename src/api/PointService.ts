import { RentPoint } from './Api.types';

export class PointService {
  public async getPoints(): Promise<RentPoint[]> {
    const res = await fetch('/api/point');
    return res.json();
  }

  public async getPointById(pointId: string): Promise<RentPoint> {
    const res = await fetch(`/api/point/${pointId}`);
    return res.json();
  }
}
