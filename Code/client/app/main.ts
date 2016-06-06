// The usual bootstrapping imports
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent }   from './app.component';
import {provideNglConfig} from 'ng-lightning/ng-lightning';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    provideNglConfig()
]);
