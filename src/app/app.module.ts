import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HumidityTableComponent } from './humidity-table/humidity-table.component';
import { RainTableComponent } from './rain-table/rain-table.component';
import { TemperatureTableComponent } from './temperature-table/temperature-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HumidityTableComponent,
    RainTableComponent,
    TemperatureTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
