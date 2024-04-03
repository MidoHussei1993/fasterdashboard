import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalModalService {
  constructor(private translate: TranslateService) {}
  public showDeleteConfirmation(elementName?): Promise<SweetAlertResult> {
    elementName ? (elementName = `"${elementName}"`) : (elementName = '');

    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'هل انت متأكد؟',
        text: `حذف العنصر ${elementName}!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'نعم, احذف!',
        cancelButtonText: 'إلغاء',
      }).then((result) => {
        resolve(result);
      });
    });
  }
  async deleteConfirmation(): Promise<boolean> {
    return await Swal.fire({
      title: 'هل انت متاكد',
      text: 'حذف العنصر',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم احذف',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  async Confirmation(
    title: string = 'action.sure',
    text?,
    acceptButtonText?: string
  ): Promise<boolean> {
    return await Swal.fire({
      title: this.translate.instant(title),
      ...(text && { html: text }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translate.instant(
        acceptButtonText ? acceptButtonText : 'action.yes'
      ),
      cancelButtonText: this.translate.instant('action.no'),
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  Notifier(title: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  watched(title: string) {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  confirm(text: string) {
    Swal.fire({
      icon: 'success',
      position: 'center',
      title: 'للعلم',
      html: text,
      // footer: '<a href>Why do I have this issue?</a>'
    });
  }
  NotifierError(text: string) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'خطاء ...',
      text: text,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  async navigationConfirmation(): Promise<boolean> {
    return await Swal.fire({
      title: 'هل انت متاكد',
      text: 'الانتقال دون حفظ التغيرات',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم الانتقال',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      return result.isConfirmed;
    });
  }
}
