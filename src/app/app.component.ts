import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sortingproject';
  barsCount = 50;
  min = 10;
  max = 100;

  Values = [];
  maxValue: number;
  selectedIndex = -1;
  iteratingOn = -1;

  isSorting: boolean;
  barsGenerated: boolean;

  ngOnInit() {
    // this.GetSortData();
  }

  CheckNegative(model: string, $event: number) {
    if ($event < 0) {
      // tslint:disable-next-line: no-eval
      eval(model + '=0');
    }
  }

  GetSortData() {
    this.selectedIndex = -1;
    this.iteratingOn = -1;
    this.Values = [];
    this.maxValue = 0;
    for (let i = 0; i < this.barsCount; i++) {
      const value = this.getRandomBetweenNums(this.min, this.max);
      this.Values.push(value);
      if (this.maxValue < value) {
        this.maxValue = value;
      }
    }
    if (this.Values.length) {
      this.barsGenerated = true;
    }
  }

  getRandomBetweenNums(min: number, max: number) {
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
  }

  GetPercent(value: number) {
    return (value * 100 / this.maxValue) + '%';
  }

  // BUBBLE SORT FUNCTIONS BELOW
  BubbleSort(index = 0) {
    this.isSorting = true;
    this.selectedIndex = index;

    setTimeout(() => {
      this.BubbleInternalLoop(index).then(() => {
        if (index < this.Values.length - 1) {
          index++;
          this.BubbleSort(index);
        } else {
          this.isSorting = false;
        }
      });
    });
  }

  BubbleInternalLoop(index: number, jIndex = 0) {
    return new Promise((resolve, reject) => {
      // this.iteratingOn = jIndex;
      setTimeout(() => {
        if (this.Values[jIndex] > this.Values[jIndex + 1]) {
          this.selectedIndex = jIndex;
          const temp = this.Values[jIndex];
          this.Values[jIndex] = this.Values[jIndex + 1];
          this.Values[jIndex + 1] = temp;
        }
        if (jIndex <= this.Values.length - 1 - index) {
          jIndex++;
          this.BubbleInternalLoop(index, jIndex).then((flag) => {
            resolve(flag);
          });
        } else {
          return resolve(true);
        }
      });
    });
  }

  // QUICK SORT FUNCTION BELOW

  InitQuickSort() {
    this.isSorting = true;
    this.QuickSort().then((response) => {
      this.isSorting = false;
    });
  }

  QuickSort(low = 0, high = this.Values.length - 1) {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      if (low < high) {
        setTimeout(() => {
          this.partition(high, low - 1, low).then((pi: number) => {
            pi++;
            this.selectedIndex = pi;
            Promise.all([this.QuickSort(low, pi - 1), this.QuickSort(pi + 1, high)]).then(
              (responses: Array<any>) => {
                if (!responses[0] && !responses[1]) {
                  resolve(false);
                }
              });
          });
        }, 500);
      } else {
        resolve(false);
      }
    });
  }

  partition(high: number, index: number, jIndex: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.iteratingOn = jIndex;
        if (jIndex <= high - 1) {
          if (this.Values[jIndex] < this.Values[high]) {
            index++;
            const temp = this.Values[index];
            this.Values[index] = this.Values[jIndex];
            this.Values[jIndex] = temp;
          }
          jIndex++;
          this.partition(high, index, jIndex).then((i) => {
            resolve(i);
          });
        } else {
          const temp1 = this.Values[index + 1];
          this.Values[index + 1] = this.Values[high];
          this.Values[high] = temp1;
          resolve(index);
        }
      });
    });
  }

  CheckSorted(arr: Array<number>) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
    return true;
  }

  // MERGE SORT FUNCTIONS BELOW

  StartergeSort() {
    this.mergeSort(0, this.Values.length - 1);
  }

  mergeSort(l: number, r: number) {
    if (l < r) {
      const m = Math.floor(l + (r - l) / 2);
      this.selectedIndex = m;

      this.mergeSort(l, m);
      this.mergeSort(m + 1, r);
      this.merge(l, m, r);
    }
  }

  merge(l: number, m: number, r: number) {
    let i: number;
    let j: number;
    let k: number;
    const n1 = m - l + 1;
    const n2 = r - m;

    const L = [];
    const R = [];


    for (i = 0; i < n1; i++) {
      L.push(this.Values[l + i]);
    }
    for (j = 0; j < n2; j++) {
      R.push(this.Values[m + 1 + j]);
    }

    i = 0;
    j = 0;
    k = l;
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        this.Values[k] = L[i];
        i++;
      } else {
        this.Values[k] = R[j];
        j++;
      }
      k++;
    }

    while (i < n1) {
      this.Values[k] = L[i];
      i++;
      k++;
    }

    while (j < n2) {
      this.Values[k] = R[j];
      j++;
      k++;
    }
  }


}
