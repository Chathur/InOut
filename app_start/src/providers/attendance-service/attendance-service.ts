import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GATEWAY_URL } from '../../configurations/constants';
import { genericModel } from './attendance.data';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


/*
  Generated class for the AttendanceServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AttendanceServiceProvider {

  constructor(public http: HttpClient) {
  }

  addAttendanceToDB(employeeId: number, attendanceType: number): Observable<genericModel>{
    return this.http.get(GATEWAY_URL + 'api/attendance/addAttendanceFromMobile/' + employeeId + '/' + attendanceType)
                    .map(response => JSON.parse(JSON.stringify(response)));
  }


}
