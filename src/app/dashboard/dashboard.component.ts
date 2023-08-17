import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Data {
  name: string;
  last_value: string;
  created_at: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  feedData: Data[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDataFromApi();
  }

  isFeedData(value: any): value is Data {
    return 'last_value' in value && 'created_at' in value;
  }

  getDataFromApi() {
    fetch('http://localhost:8000/api/todo', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => response.json())
      .then((data: Data[]) => {
        this.feedData = Object.values(data);

      })
      .catch((error) => {
        this.feedData = [];
      });
  }

  
  getLatestValue(nombre: string): string {
    const feed = this.feedData.find((item) => item.name === nombre);

    return feed ? feed.last_value : 'N/A';
  }
}
