import { CatalogService } from './CatalogService';
import { OrderService } from './OrderService';
import { PointService } from './PointService';
import { UserService } from './UserService';

class Api {
  public catalog: CatalogService;
  public point: PointService;
  public user: UserService;
  public order: OrderService;

  constructor() {
    this.catalog = new CatalogService();
    this.point = new PointService();
    this.user = new UserService();
    this.order = new OrderService();
  }
}

export const api = new Api();
