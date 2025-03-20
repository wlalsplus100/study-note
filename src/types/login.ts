export interface Login {
  access_token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}
