import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseDTO } from 'src/models/purchase.dto';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  purchase: PurchaseDTO;
  installments: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      numberOfInstallments: [1, Validators.required],
      '@type': ['payment_card', Validators.required],
    });
  }

  nextPage() {
    this.purchase.payment = this.formGroup.value;
    this.router.navigate([
      '/order-confirmation',
      { purchase: this.toString(this.purchase) },
    ]);
  }

  ngOnInit() {
    this.purchase = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get('purchase')
    );
  }

  toString(object: any) {
    return JSON.stringify(object);
  }
}
