export class UpdateOffer {
  constructor(
    public id: number,
    public fullname: string,
    public email: string,
    public message: string,
    public accepted: boolean,
    public offerDate: Date
  ) {}
}
