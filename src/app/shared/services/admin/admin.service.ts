import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import  {ENV} from '../../../env'

import 'rxjs/add/operator/map';
import 'rxjs/Rx';


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
      name:data.name,
      country_order:data.country_order
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
      name:data.name,
      country_order:data.country_order
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

  addHobbies(data): Observable<any> {
    let a={
      name:data.name,
      icon:data.icon,
      icons_selected:data.icons_selected
    }
    const url = `${ENV.mainApi}uploadHobbiesIconsBaseAdmin`;
    return this.http.post<any>(url,a,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   uploadHobbiesIconsBaseAdmin Test`)),
          catchError(this.handleError('get   uploadHobbiesIconsBaseAdmin Test', []))
        
    );
  }


   updateHobbies(data): Observable<any> {
    let a={
      id:data.id,
      name:data.name,
      icon:data.icon,
      icons_selected:data.icons_selected
    }
    
    const url = `${ENV.mainApi}updateHobbiesAdmin`;
    return this.http.post<any>(url,a,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   updateHobbiesAdmin Test`)),
          catchError(this.handleError('get   updateHobbiesAdmin Test', []))      
    );
  }

 updateHobbiesStatus(data): Observable<any> {
    let a={
      id:data.id,
      status:data.status
    }
    
    const url = `${ENV.mainApi}updateHobbiesAdmin`;
    return this.http.post<any>(url,a,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   updateHobbiesAdmin Test`)),
          catchError(this.handleError('get   updateHobbiesAdmin Test', []))      
    );
  }
 oneDeleteHobbies(id): Observable<any> {
    const url = `${ENV.mainApi}deleteHobbiesAdmin/${id}`;
    return this.http.get<any>(url)
          .pipe(
          tap(heroes => this.log(`get   oneditCityStatus Test`)),
          catchError(this.handleError('get   oneditCityStatus Test', []))
        
    );
  }

  editHobbies(data): Observable<any> {
    let a={
      name:data.name,
      icon:data.icon,
      icons_selected:data.icons_selected
    }
    const url = `${ENV.mainApi}hobbiesListAdmin/${data.id}`;
    return this.http.post<any>(url,a,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   hobbiesListAdmin Test`)),
          catchError(this.handleError('get   hobbiesListAdmin Test', []))
        
    );
  }

  editVideosContent(data): Observable<any> {
    let a={
      content:data.content,
      id:data.id
    }
    const url = `${ENV.mainApi}updateVideosContentAdmin`;
    return this.http.post<any>(url,a,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   hobbiesListAdmin Test`)),
          catchError(this.handleError('get   hobbiesListAdmin Test', []))
        
    );
  }

  editintroductoryContent(data): Observable<any> {
    let a={
      title:data.title,
      description:data.description,
      id:data.id
    }
    const url = `${ENV.mainApi}updateIntroductoryAdmin`;
    return this.http.post<any>(url,a,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   hobbiesListAdmin Test`)),
          catchError(this.handleError('get   hobbiesListAdmin Test', []))
        
    );
  }


  getAboutUsAdmin(): Observable<any> {
    const url = `${ENV.mainApi}getAboutUsAdmin`;
    return this.http.get<any>(url,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   getAboutUsAdmin Test`)),
          catchError(this.handleError('get   getAboutUsAdmin Test', []))
        
    );
  }

 editintAboutUsContent(data): Observable<any> {
    let a={
      id:data.id,
      para_one:data.para_one,
      para_two:data.para_two,
      image_url:data.image_url,
    }
    const url = `${ENV.mainApi}updateAboutUsAdmin`;
    return this.http.post<any>(url,a,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   hobbiesListAdmin Test`)),
          catchError(this.handleError('get   hobbiesListAdmin Test', []))
        
    );
  }


  AddFaq(data): Observable<any> {
    let a={
      question:data.question,
      answer:data.answer
    }
    const url = `${ENV.mainApi}addFaqAdmin`;
    return this.http.post<any>(url,a,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   addFaqAdmin Test`)),
          catchError(this.handleError('get   addFaqAdmin Test', []))
        
    );
  }


 FindFaq(): Observable<any> {
    const url = `${ENV.mainApi}faqAllAdmin`;
    return this.http.get<any>(url,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   faqAllAdmin Test`)),
          catchError(this.handleError('get   faqAllAdmin Test', []))
        
    );
  }


 EditFaq(data): Observable<any> {
   let a={
      id:data.id,
      question:data.question,
      answer:data.answer
    }
    const url = `${ENV.mainApi}updateFaqAdmin`;
    return this.http.post<any>(url,a,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   updateFaqAdmin Test`)),
          catchError(this.handleError('get   updateFaqAdmin Test', []))
        
    );
  }


  DeleteFaq(data): Observable<any> {
    const url = `${ENV.mainApi}deleteFAQ/${data.id}`;
    return this.http.get<any>(url,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   deleteFAQ Test`)),
          catchError(this.handleError('get   deleteFAQ Test', []))
        
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


  ////////////////////(harman)////////////////////////////
  ////////// 10 feb Login //////////////////////////////

  adminLogin(loginData): Observable<any>{
        let api = `${ENV.mainApi}adminLogin`;
        return this.http.post<any>(api,loginData,httpOptions)
              .pipe(
              tap(heroes => this.log(`get   adminLogin Test`)),
              catchError(this.handleError('get   adminLogin Test', []))
            
        );
  }

  adminForgotPass(forgotData): Observable<any>{
        let api = `${ENV.mainApi}adminForgotPass`;
        return this.http.post<any>(api,forgotData,httpOptions)
              .pipe(
              tap(heroes => this.log(`get   admin Forgot Pass Test`)),
              catchError(this.handleError('get   admin Forgot Pass Test', []))
            
        );
  }

  contactUsAdmin(): Observable<any> {
      const url = `${ENV.mainApi}contactUsAdmin`;
      return this.http.get<any>(url,httpOptions)
            .pipe(
            tap(heroes => this.log(`get   contactUsAdmin Test`)),
            catchError(this.handleError('get   contactUsAdmin Test', []))
          
      );
  }


    contactUsReplyAdmin(data): Observable<any> {
      const url = `${ENV.mainApi}contactUsReplyAdmin`;
      return this.http.post<any>(url,data,httpOptions)
            .pipe(
            tap(heroes => this.log(`contactUsReplyAdmin`)),
            catchError(this.handleError('contactUsReplyAdmin', []))
          
      );
  }
/////////////////////////////////////////////////////////////////////////////
//////////// users management --12 feb -harman- ///////////////////////
usersList(): Observable<any> {
      const url = `${ENV.mainApi}allUserAdmin`;
      return this.http.get<any>(url,httpOptions)
            .pipe(
            tap(heroes => this.log(`get   allUserAdmin Test`)),
            catchError(this.handleError('get   allUserAdmin Test', []))
          
      );
  }

userDeleteAdmin(data): Observable<any> {
    const url = `${ENV.mainApi}userDeleteAdmin/${data.id}`;
    return this.http.get<any>(url,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   userDeleteAdmin Test`)),
          catchError(this.handleError('get   userDeleteAdmin Test', []))
        
    );
  }  

userStatusUpdateAdmin(data): Observable<any> {
    const url = `${ENV.mainApi}userStatusUpdateAdmin/${data.id}`;
    return this.http.get<any>(url,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   user Status Update Admin Test`)),
          catchError(this.handleError('get   user Status Update Admin Test', []))
        
    );
  }

userDetailsAdmin(data): Observable<any> {
    const url = `${ENV.mainApi}userDetailsAdmin/${data}`;
    return this.http.get<any>(url,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   userDetailsAdmin Test`)),
          catchError(this.handleError('get   userDetailsAdmin Test', []))
        
    );
  }  

  //////////////// 22 feb harman //////////////////////
  sendBrodCastMessageAdmin(data): Observable<any> {
      const url = `${ENV.mainApi}sendBrodCastMessageAdmin`;
      return this.http.post<any>(url,data,httpOptions)
            .pipe(
            tap(heroes => this.log(`sendBrodCastMessageAdmin`)),
            catchError(this.handleError('sendBrodCastMessageAdmin', []))          
      );

  }


  adminChatRoomIds(): Observable<any> {
    const url = `${ENV.mainApi}adminChatRoomIds`;
    return this.http.get<any>(url,httpOptions)
          .pipe(
          tap(heroes => this.log(`get   adminChatRoomIds Test`)),
          catchError(this.handleError('get   adminChatRoomIds Test', []))
        
    );
  }
}
