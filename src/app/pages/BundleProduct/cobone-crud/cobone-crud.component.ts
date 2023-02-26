import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FormMode } from 'src/app/shared';
import { Cobone } from '../models';
import { CoboneService } from '../services';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-cobone-crud',
  templateUrl: './cobone-crud.component.html',
  styleUrls: ['./cobone-crud.component.scss']
})
export class CoboneCrudComponent implements OnInit {


  @ViewChild('coboneForm', {static: false}) myForm: NgForm;



 // main object cobone
 cobone:Cobone = new Cobone();

 CoboneForms:Cobone = new Cobone();

  CoboneForm: FormGroup;
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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private coboneService:CoboneService

  ) {
    this.mode = this.route.snapshot.data.mode;
  }

  ngOnInit(): void {

       // init form
       this.initForm();



      // Activate Router
      if (this.route.snapshot.queryParams.isAdd === 'true' || this.route.snapshot.routeConfig.path === 'create') {
        this.isAdd = true;
        this.title = "Create New Cobone";


      } else {
        this.cobone.id = this.route.snapshot.params.id;
        this.getCountryById(this.cobone.id );
        this.isAdd = false
      }



      }

      // form validaion

      initForm() {
        this.CoboneForm = this.fb.group({
          coboneCode: [
            this.CoboneForms.coboneCode,
            Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(225),
            ]),
          ],
          amount: [
            this.CoboneForms.amount,
            Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(225),
            ]),
          ],
        });
      }

  getCountryById(id){
    this.coboneService.getByID(id).subscribe(
      res=>{
        this.cobone = res;
        this.title = "Edit Cobone" + `:${res.coboneCode}`;



  }
    )}

    // submit

    submit() {

      if (this.isAdd == true){
        this.hasError = false;
        this.cobone.createAt = new Date();
        this.coboneService.create(this.cobone).subscribe(
          res=>{
            this.myForm.resetForm();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })


          }, err=>{

          }
        )
      }
      else{
        this.hasError = false;
        this.cobone.createAt = new Date();

        this.coboneService.update(this.cobone.id ,this.cobone).subscribe(
          res=>{
            this.myForm.resetForm();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })


          }, err=>{

          }
        )


      }

    }

}
