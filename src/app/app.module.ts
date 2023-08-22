import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HumidityTableComponent } from './humidity-table/humidity-table.component';
import { RainTableComponent } from './rain-table/rain-table.component';
import { TemperatureTableComponent } from './temperature-table/temperature-table.component';
import { SoundTableComponent } from './sound-table/sound-table.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard'; // Importa AuthGuard aquí
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LuminityTableComponent } from './luminity-table/luminity-table.component';
import { DistanceTableComponent } from './distance-table/distance-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HumidityTableComponent,
    RainTableComponent,
    TemperatureTableComponent,
    SoundTableComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    NavbarComponent,
    LuminityTableComponent,
    DistanceTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
