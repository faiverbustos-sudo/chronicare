import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { ConfirmationService, MessageService } from 'primeng/api';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),

    // 👇 Necesario para p-confirmDialog y p-toast
    MessageService,
    ConfirmationService
  ]
})
.catch(err => console.error(err));
