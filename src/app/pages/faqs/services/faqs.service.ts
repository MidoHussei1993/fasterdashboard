import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { List } from 'src/app/shared';
import { Faqs, FaqsFilter } from '../models';

const API = END_POINTS.FAQs;

@Injectable({
  providedIn: 'root',
})
export class FaqsService {
  constructor(private http: HttpClient) {}

  create(model: Faqs): Observable<Faqs> {
    return this.http.post<Faqs>(API.add, model);
  }

  get(filter: FaqsFilter): Observable<List<Faqs>> {
    return this.http.get<List<Faqs>>(API.search, {
      params: {
        ...(filter.PageSize && { PageSize: filter.PageSize }),
        ...(filter.PageNumber && { PageNumber: filter.PageNumber }),
        ...(filter.IsActive && { ApplicationUserId: filter.IsActive }),
        ...(filter.Answers && { Answers: filter.Answers }),
        ...(filter.AnswersAr && { AnswersAr: filter.AnswersAr }),
        ...(filter.Question && { Question: filter.Question }),
        ...(filter.QuestionAr && { QuestionAr: filter.QuestionAr }),
         ...(filter.CreateAtFrom && {CreateAtFrom: String(moment(filter.CreateAtFrom).format('YYYY-MM-DD HH:mm:ss'))}),
         ...(filter.CreateAtTo && {CreateAtTo: String(moment(filter.CreateAtTo).format('YYYY-MM-DD HH:mm:ss'))}),
      },
    });
  }

  getByID(id: number): Observable<Faqs> {
    return this.http.get<Faqs>(API.getById(id));
  }

  update(model: Faqs): Observable<Faqs> {
    return this.http.put<Faqs>(API.update, model);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(API.delete + id);
  }
  ChangeFAQsActivation(body: {
    FAQsId: number;
    IsActive: boolean;
  }): Observable<boolean> {
    return this.http.put<boolean>(
      API.ChangeFAQsActivation,
      {},
      {
        params: {
          ...(body.FAQsId && { FAQsId: body.FAQsId }),
          IsActive: body.IsActive,
        },
      }
    );
  }
}
