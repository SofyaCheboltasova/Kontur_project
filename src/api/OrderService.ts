import { Order } from './Api.types';

export class OrderService {
  public async createOrder(bikeId: string): Promise<Order> {
    const body = JSON.stringify({ bikeId });

    const res = await fetch('/api/order', {
      body,
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    return res.json();
  }

  public async getOrders(): Promise<Order[]> {
    const res = await fetch('/api/order');

    return res.json();
  }

  public async getOrder(orderId: string): Promise<Order> {
    const res = await fetch(`/api/order/${orderId}`);

    return res.json();
  }

  public async getCompletedOrders(): Promise<Order[]> {
    const res = await fetch('/api/order/get-completed-orders');

    return res.json();
  }

  public async startRent(orderId: string): Promise<void> {
    const res = await fetch(`/api/order/rent?orderId=${orderId}`);

    return res.json();
  }

  public async stopRent(orderId: string): Promise<Order> {
    const res = await fetch(`/api/order/stop-rent?orderId=${orderId}`);

    return res.json();
  }

  public async getQRCode(orderId: string): Promise<{ code: string }> {
    const res = await fetch(`/api/order/get-qrcode?orderId=${orderId}`);

    return res.json();
  }

  public async deleteOrder(orderId: string): Promise<void> {
    const body = JSON.stringify({ orderId });

    const res = await fetch('/api/order', {
      body,
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    return res.json();
  }
}
