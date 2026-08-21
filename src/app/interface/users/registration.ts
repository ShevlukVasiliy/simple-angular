export interface RegistrationParams {
  fastJwt: boolean;
}

export interface RegistrationBody {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface RegistrationResponseSuccess {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface RegistrationResponseError {
  message: string[];
  error: string;
  statusCode: number;
}
