import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HumidityTableComponent } from './humidity-table/humidity-table.component';
import { RainTableComponent } from './rain-table/rain-table.component';
import { SoundTableComponent } from './sound-table/sound-table.component';
import { TemperatureTableComponent } from './temperature-table/temperature-table.component';
import {DashboardComponent} from './dashboard/dashboard.component'


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { showHeader: false }},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'humedad', component: HumidityTableComponent },
  { path: 'lluvia', component: RainTableComponent },
  { path: 'sonido', component: SoundTableComponent },
  { path: 'temperatura', component: TemperatureTableComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
