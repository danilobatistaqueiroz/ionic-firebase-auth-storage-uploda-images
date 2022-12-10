import { Component } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    profile:DocumentData={};

    constructor(
        private authService: AuthService, 
        private loadingController: LoadingController, 
        private router: Router,
        private alertController: AlertController, 
        private avatarService: AvatarService) 
    {
        this.avatarService.getUserProfile().subscribe((data) => {
            this.profile = data;
        });
    }

    async logout() {
        const loading = await this.loadingController.create();
        await loading.present();

        await this.authService.logout();
        await loading.dismiss();

        this.router.navigateByUrl('/', { replaceUrl: true });
    }

    async changeImage() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Photos // Camera, Photos or Prompt!
        });

        if (image) {
            const loading = await this.loadingController.create();
            await loading.present();

            debugger;
            const result = await this.avatarService.uploadImage(image);
            loading.dismiss();

            if (!result) {
                const alert = await this.alertController.create({
                    header: 'Upload failed',
                    message: 'There was a problem uploading your avatar.',
                    buttons: ['OK']
                });
                await alert.present();
            }
        }
    }
}
