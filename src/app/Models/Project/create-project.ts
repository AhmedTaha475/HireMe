export class CreateProject {
  constructor(
    public title: string,
    public description: string,
    public Date: Date,
    public SystemProject: boolean,
    public ClientId: string,
    public PortfolioId: number,
    public MoneyEarned: number,
    public ProjectImgs: any[]
  ) {}
}
