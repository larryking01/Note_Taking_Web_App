import { Component, inject, computed } from '@angular/core';
import { ErrorService } from '../../services/errorService/error-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-banner',
  imports: [CommonModule],
  templateUrl: './error-banner.html',
  styleUrl: './error-banner.scss'
})
export class ErrorBanner {
  errorService = inject( ErrorService )

  showErrorBanner = computed(() => this.errorService.errorMessage())

}
