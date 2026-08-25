import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { CloseBottomNotification } from '../../../store/notification.model';
import { NotificationState } from '../../../store/notification.state';

@Component({
  selector: 'app-bottom-notification',
  imports: [],
  templateUrl: './bottom-notification.html',
  styleUrl: './bottom-notification.css',
})
export class BottomNotification {
  private store = inject(Store);

  public isClosed = this.store.selectSignal(NotificationState.isBottomClosed);

  close(): void {
    this.store.dispatch(new CloseBottomNotification());
  }
}
