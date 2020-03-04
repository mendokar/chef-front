import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private toastr: ToastrService) {}
 
  showSuccess(msg) {
    this.toastr.success(msg);
  }

  showError(msg) {
    this.toastr.error(msg);
  }
}
