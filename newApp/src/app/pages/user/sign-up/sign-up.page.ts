import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { AppserviceService } from 'src/app/app/appservice.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  providers: []
})
export class SignUpPage implements OnInit {
  public onRegisterForm: FormGroup;
  constructor(private userService: AppserviceService,   
    public navCtrl: NavController,
    private formBuilder: FormBuilder
    ) { }
  ionViewWillEnter() {
    //this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }
//f
onSignup(f:FormGroup) {
  console.log(f);
  this.userService.signup(f).subscribe(resu=>{
    console.log(resu)
  });
  }

  // // //
  goToLogin() {
    //this.navCtrl.navigateRoot('/');
  }
}

