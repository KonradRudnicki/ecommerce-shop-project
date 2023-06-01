import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormService} from "../../services/form.service";
import * as dns from "dns";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(private formBuilder: FormBuilder,
              private formService: FormService) {}

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    //populate credit card months and years
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth)

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved months" + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )

    const startYear: number = new Date().getFullYear() + 1;
    console.log("startYear: " + startYear);

    this.formService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved years" + JSON.stringify(data));
        this.creditCardYears = data;
      }
    )
  }

  copyShippingAddressToBillingAddress(event: Event) {
    if((event.target as HTMLInputElement).checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  onSubmit() {
    console.log("Handling the submit button")
    console.log(this.checkoutFormGroup.get('customer')?.value);


  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth: number;

    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data))
        this.creditCardMonths = data;
      }
    )
  }
}
