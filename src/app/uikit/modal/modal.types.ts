import { InjectionToken } from '@angular/core';

export interface ModalButton {
  label: string;
  value?: unknown;
  variant?: 'primary' | 'secondary' | 'danger';
  isCancel?: boolean;
}

export interface ModalOptions<TData = unknown> {
  title?: string;
  content?: string;
  data?: TData;
  buttons?: ModalButton[];
}

export const MODAL_DATA = new InjectionToken<ModalOptions>('MODAL_DATA');
