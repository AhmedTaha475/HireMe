export class CreatePPApplicant {
  constructor(
    public pP_ID: number,
    public biddingPrice: number,
    public proposal: string,
    public freelancerId: string
  ) {}
}
