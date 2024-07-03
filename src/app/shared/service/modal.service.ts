import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { ConfirmComponent } from '../component/modal/confirm/confirm.component';
import { AlertComponent } from '../component/modal/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private overlayRef!: OverlayRef;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
  ) { }

  openConfirm(data: any) {
    return new Promise<boolean>((resolve, reject) => {
      const overlayRef = this.overlay.create({
        hasBackdrop: true,
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),

      });

      const injector = Injector.create({
        providers: [{ provide: DIALOG_DATA, useValue: data }],
        parent: this.injector
      });

      const portal = new ComponentPortal(ConfirmComponent, null, injector);
      const componentRef = overlayRef.attach(portal);

      componentRef.instance.closeEvent.subscribe((value) => {
        resolve(value);
        this.close();
      });

      this.overlayRef = overlayRef;

      document.body.style.overflow = 'hidden';

    });
  }

  openAlert(data: any) {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),

    });

    const injector = Injector.create({
      providers: [{ provide: DIALOG_DATA, useValue: data }],
      parent: this.injector
    });

    const portal = new ComponentPortal(AlertComponent, null, injector);
    const componentRef = overlayRef.attach(portal);

    componentRef.instance.closeEvent.subscribe(() => {
      this.close();
    });

    this.overlayRef = overlayRef;

    document.body.style.overflow = 'hidden';
  }

  close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      document.body.style.overflow = '';
    }
  }
}
