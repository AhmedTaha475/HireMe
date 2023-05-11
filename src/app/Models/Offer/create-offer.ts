export class CreateOffer {
  constructor(
    public fullname: string,
    public email: string,
    public message: string,
    public clientId: string,
    public freelancerId: string,
    public accepted: any,
    public offerDate: Date
  ) {}
}
