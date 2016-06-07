import { Component, ViewChild, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { DonorModalComponent } from './../modal/donor-modal.component';
import { DonorService } from './../donor.service';
import { Donor} from  './../donor';
import { ToasterContainerComponent, ToasterService, Toast} from 'angular2-toaster/angular2-toaster';

@Component({
    selector: 'donor-detail',
    templateUrl: 'app/donor/detail/donor-detail.component.html',
    directives: [DonorModalComponent, ToasterContainerComponent],
    providers: [ToasterService]
})
export class DonorDetailComponent implements OnInit{
    
    @ViewChild('donorModal')
    modal: DonorModalComponent;
    
    donor: Donor;
    title: String = 'What do you want to do with this donor?'
        
    constructor(
        private donorService: DonorService,
        private toasterService: ToasterService,
        private routeParams: RouteParams
        ){}
    
    ngOnInit(){
        let id = this.routeParams.get('id');
        this.donorService.getDonor(id)
            .then(donor => {
                this.donor = donor;
            },() => {
                var toast : Toast = {
                    type: 'error',
                    title: 'Donor Not Found'
                    };
                this.toasterService.pop(toast);
                this.title='Donor Not Found';
            });
    }
    
    delete(){
        this.donorService.delete(this.donor)
             .then(() =>{
                var toast : Toast = {
                        type: 'success',
                        title: 'Donor Deleted'
                    };
                this.toasterService.pop(toast);
             });    
    }
    
    edit(){
        this.modal.updateDonor(this.donor);
    }
}
