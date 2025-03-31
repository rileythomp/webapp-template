import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/model';
import { JwtService } from './jwt.service';
import { formattedDate } from './utils';

const apiAddr = environment.apiServerUrl;
const httpProtocol = environment.httpProtocol;
const nullUser = {
    email: '',
    imgUrl: '',
    authenticated: false,
    name: '',
    dateJoined: '',
    public: false,
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient,
        private jwt: JwtService,
    ) { }

    async GetUserByName(name: string): Promise<{ user: User, err: Error | null }> {
        let resp;
        try {
            resp = await firstValueFrom(this.get(`users/${name}`))
        } catch (error) {
            return { user: nullUser, err: Error('Error getting user by name') }
        }
        let user: User = {
            email: resp.email,
            imgUrl: resp.imgUrl,
            authenticated: false,
            name: resp.displayName,
            dateJoined: formattedDate(resp.createdAt),
            public: resp.public,
        }
        return { user: user, err: null }
    }

    async GetDailyGame(): Promise<{ dailyGame: any, error: Error | null }> {
        let resp;
        try {
            resp = await firstValueFrom(this.get('daily-game'))
        } catch (error) {
            return { dailyGame: null, error: Error('Error getting daily game') }
        }
        return { dailyGame: resp, error: null }
    }

    private post(path: string, req: any): Observable<any> {
        return this.http.post<any>(
            `${httpProtocol}://${apiAddr}/starbattle/${path}`,
            req,
            this.headers()
        )
    }

    private put(path: string, req: any): Observable<any> {
        return this.http.put<any>(
            `${httpProtocol}://${apiAddr}/starbattle/${path}`,
            req,
            this.headers()
        )
    }

    private get(path: string): Observable<any> {
        return this.http.get<any>(
            `${httpProtocol}://${apiAddr}/starbattle/${path}`,
            this.headers(),
        )
    }

    private headers() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Token': this.jwt.GetJWT(),
            })
        }

    }
}
