export class ProjectPostWithApplicants{

  constructor (
    public postTitle:string,
    public description:string,
    public averagePrice :number,
    public categoryId :number,
    public projectPostApplicants: {proposal:string, biddingPrice:number, pP_ID:number,freelancerId:string}
    ){}
}
// "id": 1,
// "postTitle": "Updated",
// "description": "Updated",
// "averagePrice": 0.0000,
// "categoryId": 1,
// "projectPostApplicants": [
//     {
//         "proposal": "string",
//         "biddingPrice": 0.0000,
//         "pP_ID": 1,
//         "freelancerId": "1ff1cfad-fdc6-42ec-8462-b26f6f9154f9"
//     }