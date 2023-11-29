import {Component, OnInit} from '@angular/core';
import {IProfileModel} from "../../../../models/account/profile.model";
import {AccountService} from "../../../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public isOpen = false;
  public profile: IProfileModel | null = null;

  constructor(private accountService: AccountService, private router: Router) {
  }

  logout() {
    this.accountService.logout().subscribe(resp => {
      localStorage.removeItem("Tokens");
      this.router.navigate([''], {replaceUrl: true});
    })
  }

  toggleOpen() {
    if(this.isOpen) {
      // @ts-ignore
      document.querySelector('.profile-dialog').classList.add("hidden");
    } else {
      // @ts-ignore
      document.querySelector('.profile-dialog').classList.remove("hidden");
    }

    this.isOpen = !this.isOpen;
  }

  handleClick(el: Element) {
    if(!el.closest('.profile-dialog') && !el.closest('#toggle-profile') && this.isOpen) {
      this.toggleOpen();
    }
  }

  ngOnInit(): void {
    this.accountService.profile().subscribe(resp=>{
      this.profile = resp;
    })
  }
}
