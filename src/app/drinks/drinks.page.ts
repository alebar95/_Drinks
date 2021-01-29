import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, Platform } from '@ionic/angular';
import { DrinksService } from '../drinks.service';
import { Drink } from '../model/drink';


@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.page.html',
  styleUrls: ['./drinks.page.scss'],
})
export class DrinksPage implements OnInit, AfterViewInit {
  drinks: Drink[];
  searchText: string;
  @ViewChild('searchBar') searchBar: IonSearchbar;
  constructor(public platform: Platform, private drinksService: DrinksService, private router: Router) { }
  ngAfterViewInit(): void {

    console.log(this.searchBar);
  }

  ngOnInit() {
    this.getDrinks('margarita');
   
  }


  getDrinks(name: string) {
    this.drinksService.getDrinksByName(name).
    subscribe(
      (res: Drink[]) => {
        this.drinks = res;
      },
      err => console.error(err)
    )
  }
  goToDetail(drink: Drink) {
    this.router.navigateByUrl('drinks/'+drink.idDrink,{state: drink});
  }

}
