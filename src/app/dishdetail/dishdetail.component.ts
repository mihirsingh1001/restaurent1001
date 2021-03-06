import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Params , ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentForm } from '../shared/comment';
  import { from } from 'rxjs';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  

  dish: Dish;
  feedbackForm: FormGroup;
  commentForm: CommentForm;
  feedback: CommentForm;
  @ViewChild('ffrom') feedbackFormDirective;


  formErrors = {
       'name': '',
       'comment': '', 
 };

 validationMessages = {
  'name': {
    'required':      'Author Name is required.',
    'minlength':     'Author Name must be at least 2 characters long.',
    'maxlength':     'Author Name cannot be more than 25 characters long.'
  },
  'comment': {
    'required':      'your Comment is required.',
  },

 };


  constructor(  private  fb: FormBuilder,
                private dishService: DishService,
                private route: ActivatedRoute,
                private location: Location,
          @Inject('BaseURL') private BaseURL) { 
                    this.createForm();
              }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
   this.dishService.getDish(id)
    .subscribe(dish=>  this.dish = dish);
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      name:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment:['', Validators.required],
 
     });

     this.feedbackForm.valueChanges
     .subscribe(data => this.onValueChanged(data));
     this.onValueChanged();
    }
    
       
      onValueChanged(data?: any) {
        if (!this.feedbackForm) { return; }
        const form = this.feedbackForm;
        for (const field in this.formErrors) {
          if (this.formErrors.hasOwnProperty(field)) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
              const messages = this.validationMessages[field];
              for (const key in control.errors) {
                if (control.errors.hasOwnProperty(key)) {
                  this.formErrors[field] += messages[key] + ' ';
                }
              }
            }
          }
        }
      } 
     
      
     goBack(): void {
      this.location.back()
       }

  onSubmit() {
      this.feedback = this.feedbackForm.value;
      console.log(this.feedback);
      this.feedbackForm.reset({
       name:'',
       rating: 5,
       comment:'',
      });

      this.feedbackFormDirective.resetForm();
    }
 
  
}
