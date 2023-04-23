export class UpdateClientMoney {
  constructor(
    public balance: number,
    public totalMoneySpent: number,
    public planId: number
  ) {}
}
