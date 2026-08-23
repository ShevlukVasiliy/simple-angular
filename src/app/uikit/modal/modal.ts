import { Component, inject } from '@angular/core';
import { MODAL_DATA, ModalButton } from './modal.types';
import { ModalRef } from './modal-ref';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  readonly data = inject(MODAL_DATA);
  readonly modalRef = inject(ModalRef);

  onButtonClick(btn: ModalButton) {
    if (btn.isCancel) {
      this.modalRef.close(null);
    } else {
      this.modalRef.close(btn.value ?? btn.label);
    }
  }
}
