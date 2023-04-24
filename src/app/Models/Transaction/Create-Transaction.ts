export class CreateTransaction {
  constructor(
    public dateOfTransaction: Date,
    public amount: number,
    public description: string
  ) {}
}
