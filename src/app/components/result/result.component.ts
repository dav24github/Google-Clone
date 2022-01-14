import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GoogleResponse } from 'src/app/GoogleResponse.model';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit, OnDestroy {
  results!: GoogleResponse;
  subs: Subscription[] = [];
  term: any;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    const { term } = history.state;
    this.term = term;

    if (term) {
      this.subs.push(
        this.searchService
          .getSearchData(term)
          .subscribe((data: GoogleResponse) => {
            this.results = data;
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.map((s) => s.unsubscribe());
  }

  search(form: NgForm): void {
    const { search_term } = form.value;
    this.term = search_term;

    console.log(search_term);

    this.subs.push(
      this.searchService
        .getSearchData(search_term)
        .subscribe((data: GoogleResponse) => {
          this.results = data;
        })
    );
  }
}
