import { Category } from './../../shared/models/Category';
import {Observable, throwError} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiPath: string = `api/categories`;

  constructor(
    private http: HttpClient,
  ) { }


  public getAll(): Observable<Category[]>{
    return this.http.get(`${this.apiPath}`).pipe(
      catchError(this.handleError),
      map(this.formatDataCategories)

    )}

  public getByID(id: number):Observable<Category> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.formatDataCategory)
    )}

  public createCategory():Observable<Category>{
    const body = {};
    return this.http.post(this.apiPath, body).pipe(
      catchError(this.handleError),
      map(this.formatDataCategory)
    )}

  private formatDataCategories(aux: any[]): Category[] {
    const categories: Category[] = [];
    aux.forEach(item => categories.push(item as Category));
    return categories;
  }

  public update(category: Category):Observable<Category> {
    const url = `${this.apiPath}/${category.id}`;
    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(() => category)
    )
  }

  public delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }


  private formatDataCategory(aux: any): Category{
    return aux as Category;
  }



  private handleError(err: any): Observable<any> {
    console.log('error', err)
      return throwError(err);
  }
}
