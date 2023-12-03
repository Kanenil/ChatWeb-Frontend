import {Component, HostListener} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-modal',
  template: `
    <div
      class="bg-black/50 fixed top-0 right-0 left-0 bottom-0 z-50"
      (click)="modalService.close()"
    ></div>

    <ng-content></ng-content>
  `
})
export class ModalComponent {
  constructor(
    public modalService: ModalService
  ) {}

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.modalService.close()
    }
  }
}
