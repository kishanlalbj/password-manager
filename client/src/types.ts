export interface IApp {
  _id: string;
  name: string;
  website?: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  decrypted?: string & unknown;
}
