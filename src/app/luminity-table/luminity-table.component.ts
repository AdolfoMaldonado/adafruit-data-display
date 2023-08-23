import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

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
  selector: 'app-liminosidad',
  templateUrl: './luminity-table.component.html',
  styleUrls: ['./luminity-table.component.scss'],
})
export class LuminityTableComponent implements OnInit {
  feedData: FeedData[] = [];
  filteredFeedData: FeedData[] = [];
  startDate: string = '';
  endDate: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDataFromApi();
    setInterval(() => {
      this.getDataFromApi();
    }, 3000);
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
    const url = 'http://localhost:8000/api/datos/luminosidad';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    this.http
      .get<{ status: string; datos: FeedData[] }>(url, { headers })
      .subscribe(
        (data) => {
          if (data.status === 'ok') {
            this.feedData = data.datos.map((item: FeedData) => ({
              ...item,
              value: item.value === '0' ? 'Apagado' : 'Encendido',
              created_at: this.convertToMonterreyTime(item.created_at),
            }));
            this.applyDateFilter();
          } else {
            // Handle error if response is not 'ok'
          }
        },
        (error) => {
          // Handle errors in the request
        }
      );
  }

  convertToMonterreyTime(utcTime: string): string {
    const monterreyTime = utcToZonedTime(parseISO(utcTime), 'America/Monterrey');
    return monterreyTime.toISOString(); // Formatear como necesario
  }

  applyDateFilter() {
    const filteredData = this.filterByDates(this.feedData);
    this.filteredFeedData = filteredData;
  }

  filterByDates(data: FeedData[]): FeedData[] {
    if (!this.startDate || !this.endDate) {
      return data;
    }

    return data.filter((entry) => {
      const createdAt = new Date(entry.created_at);
      return (
        createdAt >= new Date(this.startDate) &&
        createdAt <= new Date(this.endDate)
      );
    });
  }
}
