import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Donor }        from './../donor';
import { DonorService } from './../donor.service';
import { ToasterContainerComponent, ToasterService} from 'angular2-toaster/angular2-toaster';
import { DonorModalComponent } from './../modal/donor-modal.component';

@Component({
    selector: 'donor-detail',
    templateUrl: 'app/donor/detail/donor-detail.component.html',
    directives: [ToasterContainerComponent, DonorModalComponent],
    providers: [ToasterService]
})
export class DonorDetailComponent implements OnInit {
    @Input() donor: Donor;
    
    bloodGroups = ['A+', 'A-', 'AB+','AB-','B+', 'B-', 'O+', 'O-'];

    constructor(
        private donorService: DonorService,
        private routeParams: RouteParams,
        private toasterService: ToasterService) {
            this.donor = new Donor();
    }
    
    ngOnInit() {
        if (this.routeParams.get('id') !== null) {
            let id = this.routeParams.get('id');
            this.donorService.getDonor(id)
                .then(donor => {
                    this.donor = donor;
                });
        }
    }
    
    save() {
        this.donorService
            .save(this.donor)
            .then(donor => {
                this.donor = donor;
                this.toasterService.pop('success', 'Donor Updated');
            })
            .catch(error => this.error = error);
    }
    
}
