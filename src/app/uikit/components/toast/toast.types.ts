export type ToastType = 'success' | 'error' | 'info';

export interface ToastInfo {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

export interface ToastItem {
  id: number;
  title: string;
  description: string;
  type: ToastType;
  duration: number;
  leaving: boolean;
}
