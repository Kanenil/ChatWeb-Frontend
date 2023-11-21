import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-default-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  private header: HTMLElement | null = null;

  ngOnInit(): void {
    this.header = document.querySelector('header');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // @ts-ignore
    if (window.pageYOffset > this.header?.offsetTop) {
      this.header?.classList.add("sticky");
    } else {
      this.header?.classList.remove("sticky");
    }
  }
}
