import { Injectable, inject, Injector } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalRef } from '../uikit/modal/modal-ref';
import { ModalOptions, MODAL_DATA } from '../uikit/modal/modal.types';
import { Modal } from '../uikit/modal/modal';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private overlay = inject(Overlay);
  private injector = inject(Injector);

  open<R = unknown>(options: ModalOptions): ModalRef<R> {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      panelClass: 'modal-panel-wrapper',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });

    const overlayRef = this.overlay.create(overlayConfig);
    const modalRef = new ModalRef<R>(overlayRef);

    const customInjector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: MODAL_DATA, useValue: options },
        { provide: ModalRef, useValue: modalRef },
      ],
    });

    const portal = new ComponentPortal(Modal, null, customInjector);
    overlayRef.attach(portal);

    overlayRef.backdropClick().subscribe(() => modalRef.close());

    return modalRef;
  }
}
