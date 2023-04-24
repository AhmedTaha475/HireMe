import { UserChild } from "./user-child";

export class GetReviewByProjectID{
    constructor (public PR_Id:number,
        public ClientReview:string,
        public ClientStars:number,
        public FreelancerReview:string,
        public FreelancerStars:number,
        public Client:UserChild,
        public Freelancer:UserChild
        ){}
}