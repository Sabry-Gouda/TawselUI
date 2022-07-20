import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ShipmentWeight } from 'src/app/models/shipment-weight';
import { ShipmentWeightService } from 'src/app/services/shipment-weight.service';

@Component({
  selector: 'app-shipping-cost',
  templateUrl: './shipping-cost.component.html',
  styleUrls: ['./shipping-cost.component.css']
})
export class ShippingCostComponent implements OnInit {

  weightForm!: UntypedFormGroup;
  weight: ShipmentWeight;


  constructor(private formBuilder: UntypedFormBuilder, private shipmentWeightService: ShipmentWeightService) {
    this.weight = new ShipmentWeight();
  }

  ngOnInit(): void {
    this.weightForm = this.formBuilder.group({
      highestWeight: new UntypedFormControl('', [Validators.required,Validators.min(0)]),
      cost: new UntypedFormControl('', [Validators.required, Validators.min(0)]),
      additionalPrice: new UntypedFormControl('', [Validators.required, Validators.min(0)]),
    });

    this.getWeightSettings();
  }
  getWeightSettings() {
    this.shipmentWeightService.getById(1)
      .subscribe(
        data => { this.weight = data },
        err => {
          console.log(err);
        })
  }


  public get highestWeight() {
    return this.weightForm.get('highestWeight');
  }

  public get cost() {
    return this.weightForm.get('cost');
  }

  public get additionalPrice() {
    return this.weightForm.get('additionalPrice');
  }




  saveShipmentWeight(highestWeight: number, cost: number, additionalPrice: number) {
    this.weight.highestWeight = highestWeight;
    this.weight.cost = cost;
    this.weight.additionalCost = additionalPrice;

    this.shipmentWeightService
      .update(1, this.weight);
  }

}
