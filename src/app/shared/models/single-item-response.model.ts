export class SingleItemResponse<T> {
  apiStatusCode: number;
  errorMessage: string;
  isSucceeded: boolean;
  returnData: T;
}
