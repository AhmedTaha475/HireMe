export class GetOffer {
  constructor(
    public id: number,
    public fullname: string,
    public email: string,
    public message: string,
    public clientId: string,
    public freelancerId: string,
    public accepted: boolean,
    public offerDate: Date
  ) {}
}
