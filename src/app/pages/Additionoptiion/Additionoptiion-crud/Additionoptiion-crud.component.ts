import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FormMode } from 'src/app/shared';
import { AdditionOption } from '../models';
import { AdditionOptionService } from '../services';
import Swal from 'sweetalert2'
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-Additionoptiion-crud',
  templateUrl: './Additionoptiion-crud.component.html',
  styleUrls: ['./Additionoptiion-crud.component.scss']
})
export class AdditionoptionCrudComponent implements OnInit {


  @ViewChild('coboneForm', {static: false}) myForm: NgForm;



 // main object additionoption
 additionoption:AdditionOption = new AdditionOption();

 AdditionOptionForms:AdditionOption = new AdditionOption();

 AdditionOptionForm: FormGroup;
 form: FormGroup;

  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = [];

  // check Add or update
  isAdd:boolean;

  // page Title
  title:string;

  mode:FormMode;
  busyLoading: boolean = false;
  currentLanguage: string = '';
  formSubmited

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private additionService:AdditionOptionService,
    private translate: TranslateService,
    private notifier: NotifierService,
    private formBuilder: FormBuilder,
    private spinner:NgxSpinnerService ,

  ) {
    this.form = this.formBuilder.group({
      id: [0],
      name: ['', [ Validators.required]],
      price: ['', [ Validators.required]],
      nameAr: ['', [ Validators.required]],
      note: ['', [ Validators.required]],
      noteAr: ['', [ Validators.required]],
      createAt: new Date()

    });


 this.mode = this.route.snapshot.data.type;

//  console.log(this.route.snapshot.data.type)
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
   }

  ngOnInit(): void {


    if(this.mode == FormMode.Edit || this.mode == FormMode.View){
      this.additionoption = new AdditionOption();
      this.additionoption.id = this.route.snapshot.params.id;
      this.getAdditionByID(this.additionoption.id );
    }

   }

      getAdditionByID(id){
      this.additionService.getByID(id).subscribe(
      res=>{
        this.additionoption = res;
  }
    )}

    submit() {
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
      this.additionService.create(body).subscribe(result => {
        this.form.reset();
        this.spinner.hide();
        this.notifier.notify('success',this.translate.instant('global.created'))
      },err=>{
        this.spinner.hide();
        this.notifier.notify('error',err)
      })
    }
    edit() {
      this.additionoption= this.form.value;
      this.additionoption.id =  this.route.snapshot.params.id
      this.spinner.show();
      this.additionService.update(this.additionoption).subscribe(result => {
        this.spinner.hide();
        this.notifier.notify('success',this.translate.instant('global.edited'))
      },err=>{
        this.spinner.hide();
        this.notifier.notify('error',err)
      })
    }



}
