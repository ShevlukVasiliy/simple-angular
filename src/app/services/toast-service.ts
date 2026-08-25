import { Injectable, signal } from '@angular/core';
import { ToastInfo, ToastItem, ToastType } from '../uikit/components/toast/toast.types';

var DEFAULT_DURATION = 5000;
var LEAVE_DURATION = 200;

@Injectable({ providedIn: 'root' })
export class ToastService {
  public toasts = signal<ToastItem[]>([]);

  private lastId = 0;
  private timers = new Map<number, any>();

  show(info: ToastInfo): number {
    var id = ++this.lastId;

    var item: ToastItem = {
      id: id,
      title: info.title,
      description: info.description ?? '',
      type: info.type ?? 'info',
      duration: info.duration ?? DEFAULT_DURATION,
      leaving: false,
    };

    this.toasts.update((list) => [...list, item]);

    var timerId = setTimeout(() => this.close(id), item.duration);
    this.timers.set(id, timerId);

    return id;
  }

  success(title: string, description?: string, duration?: number): number {
    return this.show({ title, description, type: 'success', duration });
  }

  error(title: string, description?: string, duration?: number): number {
    return this.show({ title, description, type: 'error', duration });
  }

  info(title: string, description?: string, duration?: number): number {
    return this.show({ title, description, type: 'info', duration });
  }

  close(id: number): void {
    var timerId = this.timers.get(id);

    if (timerId) {
      clearTimeout(timerId);
      this.timers.delete(id);
    }

    var toast = this.toasts().find((item) => item.id === id);

    if (!toast || toast.leaving) {
      return;
    }

    this.toasts.update((list) =>
      list.map((item) => (item.id === id ? { ...item, leaving: true } : item)),
    );

    setTimeout(() => {
      this.toasts.update((list) => list.filter((item) => item.id !== id));
    }, LEAVE_DURATION);
  }

  clear(): void {
    this.timers.forEach((timerId) => clearTimeout(timerId));
    this.timers.clear();
    this.toasts.set([]);
  }
}
