export class CreatePlan {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public bids: number
  ) {}
}
