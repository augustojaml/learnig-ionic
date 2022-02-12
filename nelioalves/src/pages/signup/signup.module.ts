import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { CitiesService } from 'src/services/domain/cities.service';
import { StatesService } from 'src/services/domain/states.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignupPageRoutingModule,
  ],
  declarations: [SignupPage],
  providers: [CitiesService, StatesService],
})
export class SignupPageModule {}
