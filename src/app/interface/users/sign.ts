export interface SignParams {
  fastJwt: boolean;
}

export interface SignBody {
  username: string;
  password: string;
}

export interface SignResponse {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
  middleName: string;
  avatar: string;
  username: string;
  jwtToken: string;
  expiresIn: number;
}
