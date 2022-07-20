import { Status } from './../../models/status';
import { OrderTypes } from './../../models/order-types';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Government } from "../../models/government";
import { ShippingType } from "../../models/shipping-type";
import { Branches } from "../../models/branches";
import { GovernmentService } from "../../services/government.service";
import { OrderService } from "../../services/order.service";
import { ShippingTypeService } from "../../services/shipping-type.service";
import { PaymentTypeService } from "../../services/payment-type.service";
import { City } from "../../models/city";
import { Payment } from "../../models/payment";
import { OrderTypeService } from 'src/app/services/order-type.service';
import { BranchesService } from 'src/app/services/branches.service';
import { Guid } from 'guid-typescript';
import { OrderData } from "../../models/order-data";
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { formatDate } from '@angular/common';
import { Product } from 'src/app/models/product';
import { StatusService } from 'src/app/services/status.service';
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  alertType: string = "";
  message: string = "";
  isVisible: boolean = false;
  createOrderForm!: UntypedFormGroup;
  createProductForm!: UntypedFormGroup;
  submitted: boolean = false;
  orderTypes: OrderTypes[] = [];
  governments: Government[] = [];
  cities: City[] = [];
  shippingMethods: ShippingType[] = [];
  paymentMethods: Payment[] = [];
  branches: Branches[] = [];
  isShippableToVillage: boolean = false;
  numberOfProducts: number = 0;
  products: Product[] = [];
  newOrder: OrderData = new OrderData();
  createdCustomerId: number = 0;
  currentUser: any = localStorage.getItem("userId")?.toString();
  totalWeightVar: number = 0;
  totalCostVar: number = 0;

  ngOnInit(): void {
    this.createOrderForm = this.formBuilder.group({
      orderType: new UntypedFormControl('', [Validators.required]),
      customerName: new UntypedFormControl('', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")]),
      phoneNumber1: new UntypedFormControl('', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$')]),
      phoneNumber2: new UntypedFormControl('', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$')]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      government: new UntypedFormControl('', [Validators.required]),
      city: new UntypedFormControl('', [Validators.required]),
      street: new UntypedFormControl('', [Validators.required]),
      shippingMethod: new UntypedFormControl('', [Validators.required]),
      paymentMethod: new UntypedFormControl('', [Validators.required]),
      branch: new UntypedFormControl('', [Validators.required]),
      orderCost: new UntypedFormControl('', [Validators.required, Validators.min(1)]),
      totalWeight: new UntypedFormControl('', [Validators.required, Validators.min(1)]),
      traderPhoneNumber: new UntypedFormControl('', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$')]),
      traderAddress: new UntypedFormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('[a-z|A-Z|0-9]+')]),
    });

    this.createProductForm = this.formBuilder.group({
      productName: new UntypedFormControl('', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z 0-9]*)*$")]),
      quantity: new UntypedFormControl('', [Validators.required, Validators.min(1)]),
      weight: new UntypedFormControl('', [Validators.required, Validators.min(1)]),
    });

    this.getAvailableGovernments();
    this.getAllShippingTypes();
    this.getAllPaymentMethods();
    this.getAllBranches()
    this.getAllOrderTypes();

  }

  get orderType() {
    return this.createOrderForm.get('orderType');
  }
  get customerName() {
    return this.createOrderForm.get('customerName');
  }
  get phoneNumber1() {
    return this.createOrderForm.get('phoneNumber1');
  }
  get phoneNumber2() {
    return this.createOrderForm.get('phoneNumber2');
  }
  get email() {
    return this.createOrderForm.get('email');
  }
  get government() {
    return this.createOrderForm.get('government');
  }
  get city() {
    return this.createOrderForm.get('city');
  }
  get street() {
    return this.createOrderForm.get('street');
  }
  get shippingMethod() {
    return this.createOrderForm.get('shippingMethod');
  }
  get paymentMethod() {
    return this.createOrderForm.get('paymentMethod');
  }
  get branch() {
    return this.createOrderForm.get('branch');
  }
  get orderCost() {
    return this.createOrderForm.get('orderCost');
  }
  get totalWeight() {
    return this.createOrderForm.get('totalWeight');
  }
  get traderPhoneNumber() {
    return this.createOrderForm.get('traderPhoneNumber');
  }
  get traderAddress() {
    return this.createOrderForm.get('traderAddress');
  }

  public get productName() {
    return this.createProductForm.get('productName');
  }

  public get quantity() {
    return this.createProductForm.get('quantity');
  }

  public get weight() {
    return this.createProductForm.get('weight');
  }




  constructor(
    private governmentService: GovernmentService,
    private orderService: OrderService,
    private shippingService: ShippingTypeService,
    private paymentService: PaymentTypeService,
    private formBuilder: UntypedFormBuilder,
    private orderTypeService: OrderTypeService,
    private branchesService: BranchesService,
    private customerService: CustomerService,
  ) {
  }

  getAllOrderTypes() {
    this.orderTypeService.getAll().subscribe(data => {
      this.orderTypes = data;

    }, error => console.log(error))
  }

  getAvailableGovernments() {
    this.governmentService.getGovernmentAvailable().subscribe(data => {
      this.governments = data;
    })

  }

  loadGovernmentCities(govId: number) {

    this.governmentService.getGovernmentCities(govId).subscribe(
      (data) => {
        this.cities = data
      },
      (err) => {
        console.log(err);

      }
    )
  }

  getAllShippingTypes() {
    this.shippingService.getAll().subscribe(data => {
      this.shippingMethods = data;
    })
  }

  getAllBranches() {
    this.branchesService.getByStatus().subscribe(data => {
      this.branches = data;

    }, error => console.log(error))
  }

  getAllPaymentMethods() {
    this.paymentService.getAll().subscribe(data => {
      this.paymentMethods = data;
    })
  }

  newProduct(name: string, quantity: number, weight: number) {
    let product = new Product(++this.numberOfProducts, name, quantity, weight);
    this.totalWeightVar += product.quantity * product.weight;
    this.products.push(product);
    this.calculateTotalCost();
    console.log(this.products);
    this.createProductForm.reset();
  }

  calculateTotalCost() {

  }

  removeProduct() {

  }

  createOrder(
    orderTypeId: number,
    customerName: string,
    phone1: string,
    phone2: string,
    email: string,
    stateId: number,
    cityId: number,
    street: string,
    shipId: number,
    PayId: number,
    branchId: number
  ) {
    if (!this.products.length) {
      this.isVisible = true;
      this.alertType = "danger";
      this.message = "Please Add Some Products to Order"
      return;
    }

    this.newOrder.userId = this.currentUser;

    // get new status Id
    let statusId = 1;
    this.newOrder.statusId = statusId;
    this.newOrder.orderTypeId = orderTypeId;

    // Customer Data
    this.newOrder.customerData.name = customerName;
    this.newOrder.customerData.phoneNumber1 = phone1;
    this.newOrder.customerData.phoneNumber2 = phone2;
    this.newOrder.customerData.email = email;

    this.newOrder.stateId = stateId;
    this.newOrder.cityId = cityId;
    this.newOrder.street = street;
    this.newOrder.isShippableToVillage = this.isShippableToVillage;
    this.newOrder.shipmentMethodId = shipId;
    this.newOrder.paymentMethodId = PayId;
    this.newOrder.branchId = branchId;
    this.newOrder.products = this.products;
    this.newOrder.totalWeight = this.totalWeightVar;
    this.newOrder.totalCost = this.totalCostVar;

    console.log(this.newOrder);

    this.orderService.insert(this.newOrder).subscribe(
      (data) => {
        console.log(data);
        alert("Order Added Successfully")
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        alert("Error Occured")

      }
    )

  }



}


