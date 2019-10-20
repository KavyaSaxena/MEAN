import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AppserviceService } from 'src/app/app/appservice.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  public onLoginForm: FormGroup;
  serverErrorMessages: string;
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private userService: AppserviceService,
    private router : Router) { }
    ionViewWillEnter() {
      this.menuCtrl.enable(false);
    }
  
    ngOnInit() {
  
      this.onLoginForm = this.formBuilder.group({
        'email': [null, Validators.compose([
          Validators.required
        ])],
        'password': [null, Validators.compose([
          Validators.required
        ])]
      });
    }
  
    async forgotPass() {
      const alert = await this.alertCtrl.create({
        header: 'Forgot Password?',
        message: 'Enter you email address to send a reset link password.',
        inputs: [
          {
            name: 'email',
            type: 'email',
            placeholder: 'Email'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Confirm',
            handler: async () => {
              const loader = await this.loadingCtrl.create({
                duration: 2000
              });
  
              loader.present();
              loader.onWillDismiss().then(async l => {
                const toast = await this.toastCtrl.create({
                  showCloseButton: true,
                  message: 'Email was sended successfully.',
                  duration: 3000,
                  position: 'bottom'
                });
  
                toast.present();
              });
            }
          }
        ]
      });
  
      await alert.present();
    }
  
    // // //
    goToRegister() {
      this.navCtrl.navigateRoot('/register');
    }
  
    goToHome(form:FormGroup) {
      //this.navCtrl.navigateRoot('/home-results');
      console.log(form);
      this.userService.login(form).subscribe(
        res => {
          this.userService.setToken(res['token']);
          this.router.navigateByUrl('/user-profile');
        },
        err => {
          this.serverErrorMessages = err.error.message;
        }
      );
    }
    

}
