import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HeaderComponent } from '../../shared/component/header/header.component';
import { InputTextComponent } from '../../shared/component/input/input-text/input-text.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    HeaderComponent,
    InputTextComponent
  ]
})
export class LoginModule { }
