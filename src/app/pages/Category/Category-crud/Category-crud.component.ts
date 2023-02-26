import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, Pattern } from 'src/app/shared';
import { CategoryService } from '../services';
@Component({
  selector: 'app-Category-crud',
  templateUrl: './Category-crud.component.html',
  styleUrls: ['./Category-crud.component.scss']
})
export class CategoryCrudComponent implements OnInit {
  mode: FormMode;
  busyLoading: boolean = false;
  currentLanguage: string = '';
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner:NgxSpinnerService ,
  ){
    this.form = this.formBuilder.group({
      id: [0],
      categoryName: ['', [Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      categoryNameAr: ['', [Validators.required,Validators.pattern(Pattern.OnlyArabicLetters)]],
      categoryImage: ['', [ Validators.required]],
      isActive: ['', [ Validators.required]],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if(this.mode == FormMode.Edit || this.mode == FormMode.View){
      this.getCountryById(this.route.snapshot.params.id)
    }

  }
  getCountryById(id:number){
    this.busyLoading = true;
    this.spinner.show();
    this.categoryService.getByID(id).subscribe(res => {
      this.spinner.hide();
      this.busyLoading = false;
      this.form.patchValue(res)
    },err => {
    this.spinner.hide();
      this.busyLoading = false;
    })
  }

  async handleInputChange(event) {
    const file = event.target.files[0];
    this.categoryService.UploadImage(file).subscribe(res => {
      this.form.get('categoryImage').patchValue(res.returnData.response)
    })
  }

  submit() {
    this.form.markAllAsTouched();
    if(!this.form.valid) return;
    if (this.mode === FormMode.Create) {
      this.create();
    } else {
      this.edit();
    }
  }
  create() {
    let body = this.form.value;
    this.spinner.show();
    this.categoryService.create(body).subscribe(result => {
      this.form.reset();
      this.form.get('id').patchValue(0);
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.created'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
  edit() {
    let body = this.form.value;
    this.spinner.show();
    this.categoryService.update(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }


}
