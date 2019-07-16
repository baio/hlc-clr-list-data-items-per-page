import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Table, TableDescription } from '@ng-holistic/clr-list';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// Provide table UI definition in js object
const table: TableDescription = {
  cols: [
    {
      id: 'name',
      title: 'Name',
      sort: true
    },
    {
      id: 'population',
      title: 'Population',
      sort: false
    }
  ]
};

@Component({
  selector: 'my-planets-table',
  template: '<hlc-clr-table [table]="table" [dataProvider]="dataProvider"></hlc-clr-table>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  readonly table = table;
  readonly dataProvider: Table.Data.DataProvider;

  constructor(httpClient: HttpClient) {
    this.dataProvider = {
      load(state: any) {
        // In general it is not a good idea to use http service directly from Component
        // real applications should always provide data access layer which make requests
        // to the rest API services and then returns data in application model structures 
        // not in raw dto object.
        // Correct architecture requires more code, here we simplify things for the sample
        // and map dto models to component models directly without intermediate application layer
        return httpClient
          .get('https://swapi.co/api/planets', {
            params: state
          }).pipe(
            catchError(err => {
              return throwError('SWAPI returns error');
            })
          );
      }
    };
  }
}
