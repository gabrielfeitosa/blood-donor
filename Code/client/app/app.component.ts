import { Component }       from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { DonorService }     from './donor/donor.service';
import { DonorDetailComponent } from './donor/detail/donor-detail.component';
import { GeolocationService }     from './util/geolocation.service';
import { MapComponent } from './map/map.component';
import { MapService } from './map/map.service';


@Component({
    selector: 'my-app',
    template: `
                <router-outlet></router-outlet>
    `,
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [
        ROUTER_PROVIDERS,
        DonorService,
        GeolocationService,
        MapService
    ]
})

@RouteConfig([
    {
        path: '/donor/:id',
        name: 'DonorDetail',
        component: DonorDetailComponent,
        useAsDefault: true
    },
    {
        path: '/map',
        name: 'Map',
        component: MapComponent
    }
])

export class AppComponent {}
