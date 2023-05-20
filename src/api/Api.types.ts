export interface CardRequisites {
  number: string;
  date: string;
  cvv: string;
}

export interface UserData {
  login: string;
  cardRequisites?: CardRequisites;
}

export interface RentPoint {
  _id: string;
  address: string;
}

export interface Bike {
  _id: string;
  name: string;
  img: string;
  cost: number;
  isRented?: boolean;
}

export interface Pagination<T> {
  itemsInPage: T[];
  hasMore: boolean;
  pages: number;
  totalItems: number;
}

export interface UpdateUserInfo {
  login?: string;
  password?: string;
  cardRequisites?: CardRequisites;
}

export interface Order {
  _id: string;
  userId: string;
  bikeId: string;
  pointId: string;
  start?: string;
  end?: string;
}
