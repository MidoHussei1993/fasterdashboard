export interface IRefreshToken {
  errorMessage: string;
  isSucceeded: boolean;
  returnData: {
    expiration: string;
    refreshToken: string;
    token: string;
  };
}
