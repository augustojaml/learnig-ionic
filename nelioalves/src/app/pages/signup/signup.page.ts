import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CityDTO } from 'src/models/city.dto';
import { StateDTO } from 'src/models/state.dto';
import { CitiesService } from 'src/services/domain/cities.service';
import { ClientService } from 'src/services/domain/client.service';
import { StatesService } from 'src/services/domain/states.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  states: StateDTO[] = [];
  cities: CityDTO[] = [];

  constructor(
    private formBuild: FormBuilder,
    private citiesService: CitiesService,
    private statesService: StatesService,
    private clientService: ClientService,
    private alertController: AlertController,
    private router: Router
  ) {
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
        'jamonteirolima@gmail4.com',
        [Validators.required, Validators.email],
      ],
      type: ['2', [Validators.required]],
      cpfOrCnpj: [
        '65109121000111',
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
    console.log(JSON.stringify(this.formGroup.value, null, 2));

    this.clientService.insert(this.formGroup.value).subscribe(
      (response) => {
        this.showAlertInsertOk();
      },
      (error) => {}
    );
  }

  updateCities() {
    this.citiesService.findAll(this.formGroup.value.stateId).subscribe(
      (response) => {
        this.cities = response;
        this.formGroup.controls.cityId.setValue(null);
      },
      (error) => {}
    );
  }

  async showAlertInsertOk() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Register customers',
      subHeader: 'Client registered successfully',
      message: '',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['/home'], { replaceUrl: true });
          },
        },
      ],
    });
    await alert.present();
  }

  ngOnInit() {
    this.statesService.findAll().subscribe(
      (response) => {
        this.states = response;
        this.formGroup.controls.stateId.setValue(this.states[0].id);
        this.updateCities();
      },
      (error) => {}
    );
  }
}
