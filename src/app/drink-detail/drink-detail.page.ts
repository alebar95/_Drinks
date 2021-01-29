import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { Drink } from "../model/drink";
import { Ingredient } from "../model/ingredient";

@Component({
  selector: "app-drink-detail",
  templateUrl: "./drink-detail.page.html",
  styleUrls: ["./drink-detail.page.scss"],
})
export class DrinkDetailPage implements OnInit {
  drink: Drink;
  ingredients: Ingredient[] = [];
  navigationSubscription: Subscription;
  constructor(private router: Router) {
    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.drink = this.router.getCurrentNavigation()?.extras?.state as Drink;
        console.log(this.drink);
        let ingredients: string[] = [];
        let measures: string[] = [];
        for (const key in this.drink) {
          if (key.indexOf("strIngredient") > -1) {
            const ingredient = this.drink[key];
            if (ingredient) ingredients.push(ingredient);
          }
          if (key.indexOf("strMeasure") > -1) {
            const measure = this.drink[key];
            if (measure) measures.push(measure);
          }
        }
        for (let i = 0; i < ingredients.length; i++) {
          this.ingredients.push({
            name: ingredients[i],
            quantity: measures[i],
          });
        }
      });
  }

  ngOnInit() {}
}
