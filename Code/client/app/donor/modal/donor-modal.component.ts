import {Component, ViewChild} from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ToasterContainerComponent, ToasterService, BodyOutputType, ToasterConfig} from 'angular2-toaster/angular2-toaster';
import { Donor} from  './../donor';
import { DonorService } from './../donor.service';

@Component({
    selector: 'donor-modal',
    templateUrl: 'app/donor/modal/donor-modal.component.html',
    directives: [MODAL_DIRECTIVES, ToasterContainerComponent],
    providers: [ToasterService]
})

export class DonorModalComponent {

    @ViewChild('donorModal')
    modal: ModalComponent;
    donor: Donor;
    bloodGroups = ['A+', 'A-', 'AB+','AB-','B+', 'B-', 'O+', 'O-'];
    infoState: boolean;
    email: String = 'click to show';
    contactNumber: String = 'click to show';
    active: boolean = true;

    toasterconfig : ToasterConfig = 
        new ToasterConfig({
            showCloseButton: true, 
            timeout: 0
        });
    
    constructor(
        private donorService: DonorService,
        private toasterService: ToasterService) {
            this.donor = new Donor();
    }
    
    private open(){
        this.email = 'click to show';
        this.contactNumber = 'click to show';
        this.modal.open();
    }
    
    updateDonor(donor: Donor) {
        this.infoState = false;
        this.donor = donor;
        this.open();
    }
    
    newDonor(locator: any){
        this.infoState = false;
        this.donor = new Donor();
        this.donor = {
           coords: {
                lat: Math.round(locator.location.latitude * 1000) / 1000,
                lon: Math.round(locator.location.longitude * 1000) / 1000
            },
            address: locator.address.Match_addr
        }
        this.open();
    }
    
    infoDonor(_id: String){
        this.infoState = true;
        this.init(_id);
    }
    
    private init(id){
        this.donor = new Donor();
        this.donorService.getDonor(id)
            .then(donor => {
                this.donor = donor;
                this.open();
            },() => {
                var toast : Toast = {
                    type: 'error',
                    title: 'Donor Not Found'
                    };
                this.toasterService.pop(toast);
            });
    }
    
    private submit() {
        this.active = false;
        setTimeout(()=> this.active=true, 0);
        this.donorService
            .save(this.donor)
            .then(donor => {
                this.donor = donor;
                
                var toast : Toast = {
                    type: 'success',
                    title: 'Donor Created',
                    body: this.getToastTemplate(donor),
                    bodyOutputType: BodyOutputType.TrustedHtml
                };
                this.toasterService.pop(toast);
            })
            .catch(error => this.error = error);
    }
    
    private getToastTemplate(donor: Donor){
        let ip = `<label>IP: </label> ${donor.ip} <br>`;
        let address = `<label>Address: </label> ${donor.address} <br>`;
        let coords = `<label>Coordinates: </label>[ ${donor.coords.lat} , ${donor.coords.lon} ]<br>`;
        let link = `<label><a  target="_blank" href="/donor/${donor._id}">Click here to edit</a></label>`;
        return ip+address+coords+link;
    }
    
    private showEmail(){
        this.email = this.donor.email;
    }

    private showContactNumber(){
        this.contactNumber = this.donor.contactNumber;
    }

}