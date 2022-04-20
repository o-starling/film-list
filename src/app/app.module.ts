import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MoneyPipe } from './core/pipes/transform-num.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { UkrDatePipe } from './core/pipes/transform-date.pipe';

@NgModule({
  declarations: [AppComponent, MoneyPipe, UkrDatePipe],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
