import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CloseBottomNotification, ResetBottomNotification } from './notification.model';

export interface NotificationStateModel {
  isBottomClosed: boolean;
}

@State<NotificationStateModel>({
  name: 'notification',
  defaults: {
    isBottomClosed: false,
  },
})
@Injectable()
export class NotificationState {
  @Selector()
  static isBottomClosed(state: NotificationStateModel): boolean {
    return state.isBottomClosed;
  }

  @Action(CloseBottomNotification)
  close(ctx: StateContext<NotificationStateModel>): void {
    ctx.setState({ isBottomClosed: true });
  }

  @Action(ResetBottomNotification)
  reset(ctx: StateContext<NotificationStateModel>): void {
    ctx.setState({ isBottomClosed: false });
  }
}
