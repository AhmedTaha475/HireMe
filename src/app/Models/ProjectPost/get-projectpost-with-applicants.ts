export class ProjectPostWithApplicants{

  constructor (
    public postTitle:string,
    public description:string,
    public averagePrice :number,
    public categoryId :number,
    public projectPostApplicants: {proposal:string, biddingPrice:number, pP_ID:number,freelancerId:string}
    ){}
}