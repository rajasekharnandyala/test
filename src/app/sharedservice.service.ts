import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  showPdf = new EventEmitter<any>();
  @Output() hideFilters: EventEmitter<any> = new EventEmitter();
  constructor() { }
  change() {
    this.hideFilters.emit(true);
  }
  getEmitedValue() {
    return this.hideFilters;
  }
}
