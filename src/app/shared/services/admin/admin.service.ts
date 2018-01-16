import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import  {ENV} from '../../../env'
  const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) { }
  CountriesList(): Observable<any> {
    const url = `${ENV.mainApi}countriesListAdmin`;
    return this.http.get<any>(url,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   oneditCityStatus Test`)),
          catchError(this.handleError('get   oneditCityStatus Test', []))
        
    );
  }
  onAddCountry(data): Observable<any> {
    let a={
      name:data.name
    }
    const url = `${ENV.mainApi}addCountryAdmin`;
    return this.http.post<any>(url,data,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   oneditCityStatus Test`)),
          catchError(this.handleError('get   oneditCityStatus Test', []))
        
    );
  }

  oneditCountry(data): Observable<any> {
    const url = `${ENV.mainApi}editCountryAdmin/${data.id}`;
    let a={
      name:data.name
    }
    return this.http.post<any>(url,a,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   oneditCityStatus Test`)),
          catchError(this.handleError('get   oneditCityStatus Test', []))
        
    );
  }

  oneditCountryStatus(data): Observable<any> {
    const url = `${ENV.mainApi}editCountryAdmin/${data.id}`;
    let a={
      status:data.status
    }
    return this.http.post<any>(url,a,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   oneditCityStatus Test`)),
          catchError(this.handleError('get   oneditCityStatus Test', []))
        
    );
  }
 
  oneDeleteCountry(id): Observable<any> {
    const url = `${ENV.mainApi}deleteCountryAdmin/${id}`;
    return this.http.get<any>(url)
          .pipe(
          tap(heroes => this.log(`get   oneditCityStatus Test`)),
          catchError(this.handleError('get   oneditCityStatus Test', []))
        
    );
  }

   CityList(): Observable<any> {
    const url = `${ENV.mainApi}citiesListAdmin`;
    return this.http.get<any>(url,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   oneditCityStatus Test`)),
          catchError(this.handleError('get   oneditCityStatus Test', []))
        
    );
  }

  onAddCity(data): Observable<any> {
     let a={
      country_id:data.country_id,
      city_name:data.city_name
    }
    const url = `${ENV.mainApi}addCityAdmin`;
    return this.http.post<any>(url,data,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   oneditCityStatus Test`)),
          catchError(this.handleError('get   oneditCityStatus Test', []))
        
    );
  }

   oneditCity(data): Observable<any> {
    const url = `${ENV.mainApi}editCityAdmin/${data.id}`;
    let a={
      country_id:data.country_id,
      city_name:data.city_name
    }
    return this.http.post<any>(url,a,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   oneditCityStatus Test`)),
          catchError(this.handleError('get   oneditCityStatus Test', []))
        
    );
  }

  oneditCityStatus(data): Observable<any> {
    const url = `${ENV.mainApi}editCityAdmin/${data.id}`;
    let a={
      status:data.status
    }
    return this.http.post<any>(url,a,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   oneditCityStatus Test`)),
          catchError(this.handleError('get   oneditCityStatus Test', []))
        
    );
  }
 
  oneDeleteCity(id): Observable<any> {
    const url = `${ENV.mainApi}deleteCityAdmin/${id}`;
    return this.http.get<any>(url)
          .pipe(
          tap(heroes => this.log(`get   oneditCityStatus Test`)),
          catchError(this.handleError('get   oneditCityStatus Test', []))
        
    );
  }


   UniversityList(): Observable<any> {
    const url = `${ENV.mainApi}universitiesListAdmin`;
    return this.http.get<any>(url,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   oneditUniversityStatus Test`)),
          catchError(this.handleError('get   oneditUniversityStatus Test', []))
        
    );
  }

  onAddUniversity(data): Observable<any> {
     let a={
      country_id:data.country_id,
      city_name:data.city_name
    }
    const url = `${ENV.mainApi}addUniversityAdmin`;
    return this.http.post<any>(url,data,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   oneditUniversityStatus Test`)),
          catchError(this.handleError('get   oneditUniversityStatus Test', []))
        
    );
  }

   oneditUniversity(data): Observable<any> {
    const url = `${ENV.mainApi}editUniversityAdmin/${data.id}`;
    let a={
      country_id:data.country_id,
      university_name:data.university_name
    }
    return this.http.post<any>(url,a,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   oneditUniversityStatus Test`)),
          catchError(this.handleError('get   oneditUniversityStatus Test', []))
        
    );
  }

  oneditUniversityStatus(data): Observable<any> {
    const url = `${ENV.mainApi}editUniversityAdmin/${data.id}`;
    let a={
      status:data.status
    }
    return this.http.post<any>(url,a,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   oneditUniversityStatus Test`)),
          catchError(this.handleError('get   oneditUniversityStatus Test', []))
        
    );
  }
 
  oneDeleteUniversity(id): Observable<any> {
    const url = `${ENV.mainApi}deleteUniversityAdmin/${id}`;
    return this.http.get<any>(url)
          .pipe(
          tap(heroes => this.log(`get   oneditCityStatus Test`)),
          catchError(this.handleError('get   oneditCityStatus Test', []))
        
    );
  }


   HobbiesList(): Observable<any> {
    const url = `${ENV.mainApi}hobbiesListAdmin`;
    return this.http.get<any>(url,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   hobbiesListAdmin Test`)),
          catchError(this.handleError('get   hobbiesListAdmin Test', []))
        
    );
  }


 introductoryList(): Observable<any> {
    const url = `${ENV.mainApi}introductoryListAdmin`;
    return this.http.get<any>(url,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   introductoryListAdmin Test`)),
          catchError(this.handleError('get   introductoryListAdmin Test', []))
        
    );
  }

  videoContentList(): Observable<any> {
    const url = `${ENV.mainApi}videosContentListAdmin`;
    return this.http.get<any>(url,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   videosContentListAdmin Test`)),
          catchError(this.handleError('get   videosContentListAdmin Test', []))
        
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('HeroService: ' + message);
    console.log(message)
  }
}
