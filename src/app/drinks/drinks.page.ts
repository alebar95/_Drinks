import {
  AfterViewInit,
  Component,
  OnInit,
  Optional,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { Platform } from "@ionic/angular";
import { DrinksService } from "../drinks.service";
import { Drink } from "../model/drink";

@Component({
  selector: "app-drinks",
  templateUrl: "./drinks.page.html",
  styleUrls: ["./drinks.page.scss"],
})
export class DrinksPage implements OnInit, AfterViewInit {
  drinks: Drink[];
  searchText: string;
  constructor(
    @Optional() private keyboard: Keyboard,
    public platform: Platform,
    private drinksService: DrinksService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit() {}

  searchDrink() {
    this.keyboard.hide();
    this.getDrinks(this.searchText);
  }
  getDrinks(name: string) {
    this.drinksService.getDrinksByName(name).subscribe(
      (res: Drink[]) => {
        this.drinks = res;
      },
      (err) => console.error(err)
    );
  }
  goToDetail(drink: Drink) {
    this.router.navigateByUrl("drinks/" + drink.idDrink, { state: drink });
  }
}
