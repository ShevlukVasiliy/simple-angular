import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';

export class ModalRef<R = unknown> {
  private afterClosed$ = new Subject<R | undefined>();

  constructor(private overlayRef: OverlayRef) {}

  close(result?: R): void {
    this.overlayRef.dispose();
    this.afterClosed$.next(result);
    this.afterClosed$.complete();
  }

  afterClosed(): Observable<R | undefined> {
    return this.afterClosed$.asObservable();
  }
}
