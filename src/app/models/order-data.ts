import { formatDate } from '@angular/common';
import { Guid } from 'guid-typescript';
import { Product } from "./product";

export class OrderData {
  constructor(
    public Id: number = 0,
    public userId: string = "",
    public statusId: number = 0,
    public orderType: number = 0,
    public serialNumber: string = Guid.create().toString(),
    public date: Date = new Date(),
    public customerData: { name: string, email: string, phoneNumber1: string, phoneNumber2: string } = { name: '', email: '', phoneNumber1: '', phoneNumber2: '' },
    public stateId: number = 0,
    public cityId: number = 0,
    public street: string = '',
    public isShippableToVillage: boolean = false,
    public shipmentMethodId: number = 0,
    public paymentMethodId: number = 0,
    public branchId: number = 0,
    public products: Product[] = [],
    public totalCost: number = 0,
    public totalWeight: number = 0,
    public traderData: { phoneNumber: string, Address: string } = { phoneNumber: '', Address: '' }

  ) { }
}

