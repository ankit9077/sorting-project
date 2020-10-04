import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnChanges {
  @Input() start: boolean;
  cnt = 0;

  check = null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.start) {
      if (changes.start.currentValue) {
        this.StartTimer();
      } else {
        this.stop();
      }
    }
  }

  ngOnInit() {
  }

  StartTimer() {
    if (this.check == null) {
      this.cnt = 0;

      this.check = setInterval(() => {
        this.cnt += 1;
      }, 1000);
    }
  }

  stop() {
    clearInterval(this.check);
    this.check = null;
  }

  GetTime(cnt: number) {
    if (cnt >= 60) {
      let minutes = Math.floor(cnt / 60).toString() + ' min ';
      if (cnt % 60 !== 0) {
        return minutes += cnt % 60 + ' sec';
      } else {
        return minutes;
      }
    } else {
      return cnt + ' sec';
    }
  }

}
