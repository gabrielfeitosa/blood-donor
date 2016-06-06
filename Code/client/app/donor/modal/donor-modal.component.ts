import {Component} from '@angular/core';
import {NGL_DIRECTIVES} from 'ng-lightning/ng-lightning';
import { Donor} from  './../donor';
import { DonorService } from './../donor.service';


@Component({
    selector: 'donor-modal',
    templateUrl: 'app/donor/modal/donor-modal.html',
    directives: [NGL_DIRECTIVES]
})

export class DonorModalComponent {

    opened: boolean = true;
    
    donor: Donor;
    bloodGroups = ['A+', 'A-', 'AB+','AB-','B+', 'B-', 'O+', 'O-'];
    
    constructor(
        private donorService: DonorService) {
            this.donor = new Donor();
    }
    
    submit() {
        this.donorService
            .save(this.donor)
            .then(donor => {
                this.donor = donor;
                console.log(donor);
            })
            .catch(error => this.error = error);
    }


}