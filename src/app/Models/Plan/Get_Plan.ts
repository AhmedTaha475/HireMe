export class GetPlan {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public bids: number
  ) {}
}
