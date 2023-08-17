import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Data {
  id: string;
  value: string;
  feed_id: number;
  feed_key: string;
  created_at: string;
  created_epoch: number;
  expiration: string;
}
@Component({
  selector: 'app-humidity-table',
  templateUrl: './humidity-table.component.html',
  styleUrls: ['./humidity-table.component.scss'],
})
export class HumidityTableComponent implements OnInit {
  Data: Data[] = [];
  DataFiltered: Data[] = [];

  createDate: string = '';
  ExpirationDate: string = '';
  StartDate: string = ''; 
  EndDate: string = '';
  showSameDateError: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDataApi();
    setInterval(() => {
      this.getDataApi();
    }, 7000);
  }

  isFeedData2(value: any): value is Data {
    return (
      'value' in value &&
      'feed_key' in value &&
      'created_at' in value &&
      'expiration' in value
    );
  }

  getDataApi() {
    fetch('http://localhost:8000/api/datos/humedad', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => response.json())
      .then((data: { status: string; datos: Data[] }) => {
        if (data.status === 'ok') {
          this.Data = data.datos;
          this.Filters();
        }
      })
  }
  Filters() {
    console.log('Selected Start Date:', this.StartDate);
    console.log('Selected End Date:', this.EndDate);

    const startDate = new Date(this.StartDate);
    const endDate = new Date(this.EndDate);

    if (
      this.StartDate &&
      this.EndDate &&
      startDate.getTime() === endDate.getTime()
    ) {
      this.showSameDateError = true;
      return;
    }

    this.showSameDateError = false;

    this.DataFiltered = this.Data.filter((data) => {
      const dataDate = new Date(data.created_at);

      if (this.StartDate && dataDate < startDate) {
        return false;
      }
      if (this.EndDate && dataDate > endDate) {
        return false;
      }
      return true;
    });
  }
}
