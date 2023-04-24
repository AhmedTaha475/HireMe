export class GetClient {
  constructor(
    public id: string,
    public firstname: string,
    public lastname: string,
    public username: string,
    public country: string,
    public city: string,
    public street: string,
    public image: string,
    public age: number,
    public ssn: string,
    public balance: number,
    public paymentmethodId: number,
    public planId: number,
    public totalMoneySpent: number,
    public email: string,
    public phonenumber: string
  ) {}
}
