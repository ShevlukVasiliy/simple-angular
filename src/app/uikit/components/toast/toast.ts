import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  public toastService = inject(ToastService);

  close(id: number): void {
    this.toastService.close(id);
  }
}
