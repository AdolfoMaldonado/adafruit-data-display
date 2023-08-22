import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface FeedData {
  name: string;
  last_value: string;
  created_at: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  feedData: FeedData[] = [];
  interval: number = 30000;
  intervalSubscription: Subscription | undefined;
  realTimeUpdateSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private ngZone: NgZone) {}

  ngOnInit() {
    console.log('Component initialized');
    this.changeInterval(this.interval);
  }

  ngOnDestroy() {
    console.log('Component destroyed');
    this.clearInterval();
   
  }

  getDataFromApi() {
    console.log('Getting data from API...');
    this.http.get<FeedData[]>('http://localhost:8000/api/todo', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    }).pipe(
      catchError((error) => [])
    ).subscribe((data: FeedData[]) => {
      console.log('Data received from API:', data);
      this.ngZone.run(() => {
        this.feedData = Object.values(data);
      });
    });
  }

  clearInterval() {
    console.log('Clearing interval...');
    if (this.intervalSubscription) {
      console.log('Interval stopped');
      this.intervalSubscription.unsubscribe();
    }
  }

  updateData() {
    console.log('Updating data manually...');
    this.getDataFromApi();
  }
  changeInterval(newInterval: number) {
    console.log('Changing interval to:', newInterval);
    this.clearInterval();
    this.interval = newInterval;
    this.getDataFromApi();
    this.intervalSubscription = interval(this.interval).subscribe(() => {
      console.log('Interval elapsed, getting data...');
      this.getDataFromApi();
    });
  }

  getLatestValue(feedName: string): string {
    const feed = this.feedData.find((item) => item.name === feedName);
    return feed ? feed.last_value : 'N/A';
  }
}
