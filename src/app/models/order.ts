export class Order {
  constructor(
    public id: number = 0,
    public serialNumber: string = "",
    public date: string = "",
    public customerData: { name: string, phoneNumber: string } = {name: '', phoneNumber: ''},
    public government: string = "",
    public city: string = "",
    public orderCost: number = 0,
    public status:string = ''
  ) {
  }
}
