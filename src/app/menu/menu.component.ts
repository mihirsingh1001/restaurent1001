import { Component, OnInit, Inject } from '@angular/core';
import { from } from 'rxjs';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess : string;

  selectedDish: Dish;

  constructor(private dishservice : DishService,
    @Inject('BaseURL') private BaseURL) {

   }

  ngOnInit() {
     this.dishservice.getDishes()
    .subscribe((dishes)=>this.dishes = dishes,
                errmess => this.errMess = <any>errmess);
   }
    
   onSelect(dish: Dish){
    this.selectedDish = dish;
  }


 
}
