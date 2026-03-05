import { Component } from '@angular/core';
import { SharedModule } from 'app/shared/modules/shared/shared-module';

@Component({
  selector: 'app-additional-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './additional-details.html',
  styleUrl: './additional-details.scss',
})
export class AdditionalDetailsComponent {

}
