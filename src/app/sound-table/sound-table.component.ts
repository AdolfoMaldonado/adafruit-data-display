import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface FeedData {
  id: string;
  value: string;
  feed_id: number;
  feed_key: string;
  created_at: string;
  created_epoch: number;
  expiration: string;
}
@Component({
  selector: 'app-sonido',
  templateUrl: './sound-table.component.html',
  styleUrls: ['./sound-table.component.scss'],
})
export class SoundTableComponent implements OnInit {
  feedData: FeedData[] = [];
  feedDataFiltered: FeedData[] = [];

  selectedCreationDate: string = '';
  selectedExpirationDate: string = '';
  selectedStartDate: string = ''; // Agrega esta línea
  selectedEndDate: string = '';
  uniqueCreationDates: string[] = [];
  uniqueExpirationDates: string[] = [];
  showSameDateError: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDataFromApi();
    setInterval(() => {
      this.getDataFromApi();
    }, 7000);
  }

  isFeedData2(value: any): value is FeedData {
    return (
      'value' in value &&
      'feed_key' in value &&
      'created_at' in value &&
      'expiration' in value
    );
  }

  getDataFromApi() {
    fetch('http://localhost:8000/api/datos/sonido', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => response.json())
      .then((data: { status: string; datos: FeedData[] }) => {
        if (data.status === 'ok') {
          this.feedData = data.datos;
          this.getUniqueDates(); // Actualizar fechas únicas
          this.applyFilters();
        } else {
          // Manejar algún tipo de error si la respuesta no es 'ok'
        }
      })
      .catch((error) => {
        // Manejar errores en la solicitud
      });
  }
  applyFilters() {
    console.log('Selected Start Date:', this.selectedStartDate);
    console.log('Selected End Date:', this.selectedEndDate);

    const startDate = new Date(this.selectedStartDate);
    const endDate = new Date(this.selectedEndDate);

    if (
      this.selectedStartDate &&
      this.selectedEndDate &&
      startDate.getTime() === endDate.getTime()
    ) {
      this.showSameDateError = true;
      return;
    }

    this.showSameDateError = false;

    this.feedDataFiltered = this.feedData.filter((data) => {
      const dataDate = new Date(data.created_at);

      if (this.selectedStartDate && dataDate < startDate) {
        return false;
      }
      if (this.selectedEndDate && dataDate > endDate) {
        return false;
      }
      return true;
    });
  }

  getUniqueDates() {
    const uniqueCreationDates = new Set<string>();
    const uniqueExpirationDates = new Set<string>();
    for (const data of this.feedData) {
      uniqueCreationDates.add(data.created_at);
      uniqueExpirationDates.add(data.expiration);
    }
    this.uniqueCreationDates = Array.from(uniqueCreationDates);
    this.uniqueExpirationDates = Array.from(uniqueExpirationDates);
  }
}