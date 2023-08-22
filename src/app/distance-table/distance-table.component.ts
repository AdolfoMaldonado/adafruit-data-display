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
  selector: 'app-distance',
  templateUrl: './distance-table.component.html',
  styleUrls: ['./distance-table.component.scss'],
})
export class DistanceTableComponent implements OnInit {
  feedData: FeedData[] = [];

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
    fetch('http://localhost:8000/api/datos/distancia', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => response.json())
      .then((data: { status: string; datos: FeedData[] }) => {
        if (data.status === 'ok') {
          this.feedData = data.datos;
        } else {
          // Manejar algún tipo de error si la respuesta no es 'ok'
        }
      })
      .catch((error) => {
        // Manejar errores en la solicitud
      });
  }
}
