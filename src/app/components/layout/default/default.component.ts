import {Component, HostListener, OnInit} from '@angular/core';
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'app-default-layout',
  templateUrl: './default.component.html'
})
export class DefaultComponent implements OnInit {
  constructor(
    public themeService: ThemeService
  ) { }

  ngOnInit() {
    this.themeService.initTheme()
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20) {
      document.querySelector('#scroller')?.classList.add('flex');
      document.querySelector('#scroller')?.classList.remove('hidden');
    } else {
      document.querySelector('#scroller')?.classList.remove('flex');
      document.querySelector('#scroller')?.classList.add('hidden');
    }
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('#scroller')?.classList.remove('flex');
    document.querySelector('#scroller')?.classList.add('hidden');
  }
}
