import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Field } from '@angular/forms/signals';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatSidenavModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatListModule,
    Field, 
    MatInputModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatTableModule, 
    MatCardModule, 
    MatDatepickerModule,
    MatRadioModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule,
    MatGridListModule,
    MatGridTile,
    MatStepperModule
  ],
  exports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatSidenavModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatListModule,
    Field, 
    MatInputModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatTableModule, 
    MatCardModule, 
    MatDatepickerModule,
    MatRadioModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule,
    MatGridListModule,
    MatGridTile,
    MatStepperModule,
  ]
})
export class SharedModule { }
