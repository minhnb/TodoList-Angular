import { Component, NgModule, Injectable } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-m-alert',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {{ modalContent }}
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="buttonOKAction()">{{ modalButtonOk.title }}</button>
      <button class="btn btn-md btn-hero-secondary" *ngIf="modalButtonCancel.display" (click)="buttonCancelAction()">{{ modalButtonCancel.title }}</button>
    </div>
  `,
})

export class MAlertComponent {

  modalHeader: string;
  modalContent = '';
  modalButtonOk = {
    title: 'OK',
    action: function() {}
  };
  modalButtonCancel = {
    title: 'Cancel',
    action: function() {},
    display: false
  };

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }

  buttonOKAction() {
    this.closeModal();
    if (this.modalButtonOk.action) this.modalButtonOk.action();
  }

  buttonCancelAction() {
    this.closeModal();
    if (this.modalButtonCancel.action) this.modalButtonCancel.action();
  }
}


@Injectable()
export class MAlert {

  constructor(private modalService: NgbModal) { }

  showModal(message: string, title: string, buttonOKAction?: () => void, buttonCancelAction?: () => void, buttonOKTitle?: string, buttonCancelTitle?: string) {
    const activeModal = this.modalService.open(MAlertComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = title;
    activeModal.componentInstance.modalContent = message;
    if (buttonOKAction) activeModal.componentInstance.modalButtonOk.action = buttonOKAction;
    if (buttonCancelAction) {
      activeModal.componentInstance.modalButtonCancel.action = buttonCancelAction;
      activeModal.componentInstance.modalButtonCancel.display = true;
    }
  }

  showError(message: string, title?: string) {
    this.showModal(message, title || 'Error');
  }

  showInfo(message: string, title?: string) {
    this.showModal(message, title || 'Info');
  }

  showConfirm(message: string, buttonOKAction: () => void, title?: string) {
    this.showModal(message, title || 'Confirmation', buttonOKAction, () => {});
  }
}


@NgModule({
  declarations: [MAlertComponent],
  imports: [CommonModule],
  providers: [MAlert],
  entryComponents: [
    MAlertComponent
  ]
})

export class MAlertModule {
}
