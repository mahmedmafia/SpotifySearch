import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { environment } from '../../environments/environment';
/**
 * SpotifyService works querying the Spotify Web API
 * https://developer.spotify.com/web-api/
 */

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  static BASE_URL = 'https://api.spotify.com/v1';
  clientId = environment.clientId;
  clientSecret =environment.clientSecret;
  accessToken;
  expiresIn;
  constructor(private http: HttpClient) {
  }

  getAuth() {

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + btoa(this.clientId + ":" + this.clientSecret));
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    let body = params.toString();
    console.log(body);
    // let options = new RequestOptions({ headers: headers });
    this.http.post('https://accounts.spotify.com/api/token', body, { headers: headers }).
      subscribe((res:any) => {
        this.accessToken = res.access_token;
        this.expiresIn=res.expires_in;
        // console.log(res.expires_in);
        // console.log(this.accessToken);
      });

  }
  query(URL: string, params?: Array<string>): Observable<any[]> {
    if(this.expiresIn==0 || !this.expiresIn){
      this.getAuth();
    }
    
    
    const headers = new HttpHeaders().set('Authorization','Bearer ' + this.accessToken );
    let queryURL = `${SpotifyService.BASE_URL}${URL}`;
    if (params) {
      queryURL = `${queryURL}?${params.join('&')}`;
    }

    return this.http.get(queryURL, { headers: headers }).pipe(map((res: any) => res));
  }

  search(query: string, type: string): Observable<any[]> {
    return this.query(`/search`, [
      `q=${query}`,
      `type=${type}`
    ]);
  }

  searchTrack(query: string): Observable<any[]> {
    return this.search(query, 'track');
  }

  getTrack(id: string): Observable<any[]> {
    return this.query(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any[]> {
    return this.query(`/artists/${id}`);
  }
  getAlbumsofArtist(id:string){
    return this.query(`/artists/${id}/albums`);
  }
  getAlbum(id: string): Observable<any[]> {
    return this.query(`/albums/${id}`);
  }
}