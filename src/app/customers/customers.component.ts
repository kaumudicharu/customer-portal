import { Component, OnInit, ViewChild } from "@angular/core";
import { Http, RequestOptions, Headers } from '@angular/http';
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { merge } from "rxjs";
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
interface ICustomerData {
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    recordsPerPage: number;
    data: ICustomer[];
}

interface ICustomer {
    customerID: string;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    phone: string;
    fax: string;
}
@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html'
})



export class CustomerComponent implements OnInit {

    public customerData: ICustomerData;
    public dataSource = new MatTableDataSource<any>();
    public resultsLength = 0;
    public displayedColumns = ['customerID', 'companyName', 'contactName', 'contactTitle', 'address', 'city', 'region', 'postalCode', 'country', 'phone', 'fax'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(private http: Http) { }

    ngOnInit(): void {
        merge(this.paginator.page)
        .pipe(
            startWith({ data: [] } as ICustomerData),
            switchMap(() => {

                return this.loadData();
            }),
            map(result => {
                let resultData = JSON.parse(result["_body"]);
                this.resultsLength = resultData["totalRecords"];
              return resultData;
            }),

          ).subscribe((data) => {
            this.dataSource = new MatTableDataSource<any>();
            this.dataSource.data = data["data"].map((item) => ({
              ...item,
            }));
          });
    }

    loadData(){
        let token = localStorage.getItem("access_token")
        const headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        const options: RequestOptions = new RequestOptions({ headers: headers });
        let body = {
            "SortBy": "companyName",
            "SortAscending": "false",
            "PageNumber": this.paginator.pageIndex,
            "RecordsPerPage": 5,
            "FilterFields": [

            ]
        };
        return this.http.post('https://test.feature.bluechain.com/v1/data/customers', body, options);
    }

}
