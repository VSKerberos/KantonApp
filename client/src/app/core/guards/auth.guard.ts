import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdminService);
  const toastr = inject(ToastrService);
  const router = inject(Router);




  return adminService.currentUser$.pipe(
    map(user=> {
      if(user) return true;
      else{
        toastr.error('Giriş yetkiniz bulunmamaktadır.!');
        router.navigate(['admin/login']);
        return false;
      }
    })
  );
};
