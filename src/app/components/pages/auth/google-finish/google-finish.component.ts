import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {EventBusService} from "../../../../shared/event-bus.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventData} from "../../../../shared/event.class";

@Component({
  selector: 'app-google-finish',
  templateUrl: './google-finish.component.html'
})
export class GoogleFinishComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    image: new FormControl(''),
    token: new FormControl(''),
    terms: new FormControl(false),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.form = this.formBuilder.group(
        {
          firstName: [params['firstName'], [Validators.required]],
          lastName: [params['lastName'], [Validators.required]],
          image: [params['image']],
          token: [params['token'], Validators.required],
          terms: [false, Validators.requiredTrue]
        }
      );
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.authService.googleRegister(this.form.value).subscribe(resp => {
      localStorage.setItem("Tokens", JSON.stringify(resp.tokens));
      this.eventBusService.emit(new EventData("Authorize", resp.tokens));
      this.router.navigate(['/chat'],{ replaceUrl: true });
    }, error => {
      this.router.navigate(['/auth','login'],{ replaceUrl: true });
    })
  }
}
