import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  constructor(private formBuild: FormBuilder) {
    this.formGroup = this.formBuild.group({
      name: [
        'Augusto Monteiro',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.minLength(10),
        ],
      ],
      email: [
        'jamonteirolima@gmail.com',
        [Validators.required, Validators.email],
      ],
      type: ['1', [Validators.required]],
      cpfOrCnpj: [
        '06134596280',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
        ],
      ],
      password: ['123', [Validators.required]],
      neighborhood: ['Rua Via', [Validators.required]],
      number: ['25', [Validators.required]],
      complement: ['Apto 3', []],
      district: ['Copacabana', []],
      zipCode: ['10828333', [Validators.required]],
      phone1: ['977261827', [Validators.required]],
      phone2: ['', []],
      phone3: ['', []],
      stateId: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
    });
  }

  formGroup: FormGroup;

  signupUser() {
    console.log('Enviou o form');
  }

  ngOnInit() {}
}
