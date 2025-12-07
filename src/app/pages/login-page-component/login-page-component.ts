import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login-page-component',
  imports: [MatCardModule, MatFormFieldModule],
  templateUrl: './login-page-component.html',
  styleUrl: './login-page-component.scss',
})
export class LoginPageComponent {

}
