import { Component, inject, computed } from '@angular/core';
import { ToastService } from '../../services/successToast/toast-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-toast-banner',
  imports: [CommonModule],
  templateUrl: './toast-banner.html',
  styleUrl: './toast-banner.scss'
})
export class ToastBanner {


  toastService = inject( ToastService )

  showToastMessage = computed(() => this.toastService.successMessage())

}
