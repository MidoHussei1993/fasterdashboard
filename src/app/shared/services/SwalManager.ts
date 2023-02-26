import Swal from 'sweetalert2';

export class SwalManager {
  constructor() {}
  public static async showConfirmToggleActiveDialog(language: string = 'en') {
    const result = await Swal.fire({
      position: 'center',
      title: 'Do You Want To Change Activation Of this row',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: false,
      showCloseButton: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });

    return result;
  }
  public static async showConfirmDelete(language: string = 'en') {
    const result = await Swal.fire({
      position: 'center',
      title: 'Do You Want To Delete this row?',
      text: "You Won't be Able To Revert This",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: false,
      showCloseButton: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });

    return result;
  }
}
