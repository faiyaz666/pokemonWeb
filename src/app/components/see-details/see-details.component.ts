import { Component, OnDestroy } from '@angular/core';
import { SharedDataService } from '../../service/shared-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details-page',
  templateUrl: './see-details.component.html',
  styleUrl: './see-details.component.scss',
})
export class SeeDetailsComponent implements OnDestroy {
  pokemon: any;
  subscription: Subscription;

  constructor(private sharedDataService: SharedDataService) {
    this.subscription = this.sharedDataService.data$.subscribe(
      (data) => (this.pokemon = data)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
