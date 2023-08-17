import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sound-table',
  templateUrl: './sound-table.component.html',
  styleUrls: ['./sound-table.component.scss'],
})
export class SoundTableComponent implements OnInit {
  data: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = 'aio_VNUu86WQDHb21sst8vXe0VWC2AgO'; // Reemplaza con tu token
    const feed = 'sonido';

    const headers = new HttpHeaders({
      'X-AIO-key': token,
    });

    this.http.get<any[]>(`https://io.adafruit.com/api/v2/AlbMaldonado2994/feeds/${feed}`, { headers }).subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
