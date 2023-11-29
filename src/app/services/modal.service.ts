import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  private selectedComponentSubject = new BehaviorSubject<any>(null);
  selectedComponent$ = this.selectedComponentSubject.asObservable();

  show(component: any) {
    this.selectedComponentSubject.next(component);
    this.isVisibleSubject.next(true);
    document.querySelector('body')?.classList.add('modal-open');
  }

  close() {
    this.isVisibleSubject.next(false);
    document.querySelector('body')?.classList.remove('modal-open');
  }
}
