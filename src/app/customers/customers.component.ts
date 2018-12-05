import { Component, OnInit, ViewChild } from "@angular/core";
import { Http, RequestOptions, Headers } from '@angular/http';
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { merge } from "rxjs";
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
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
    public filters = [];
    public displayedColumns = ['customerID', 'companyName', 'contactName', 'contactTitle', 'address', 'city', 'region', 'postalCode', 'country', 'phone', 'fax'];
    public availableColumns = ['customerID', 'companyName', 'contactName', 'contactTitle', 'address', 'city', 'region', 'postalCode', 'country', 'phone', 'fax'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private http: Http) { }

    public ngOnInit(): void {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.loadTable();
    }

    public filter(key: string, value: string) {

        let filter = { "Key": key, "Value": value };
        let index = this.filters.findIndex(
            item => item["Key"] === key
        );
        if (index > -1) {
            this.filters.splice(index, 1);
        }
        if (value || value !== "") {
            this.filters.push(filter);
        }

        this.loadTable();
    }

    private loadTable() {
        merge(this.sort.sortChange, this.paginator.page)
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

    private loadData() {
        let token = localStorage.getItem("access_token");
        const headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        const options: RequestOptions = new RequestOptions({ headers: headers });
        let body = {
            "SortBy": this.sort.active,
            "SortAscending": this.sort.direction === "asc" ? "true" : "false",
            "PageNumber": this.paginator.pageIndex,
            "RecordsPerPage": 5,
            "FilterFields": this.filters
        };
        return this.http.post('https://test.feature.bluechain.com/v1/data/customers', body, options);
    }

}
