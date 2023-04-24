import { UserChild } from "./user-child";

export class GetAllUserReviews{
    constructor (
        public ClientReview:string,
        public ClientStars:number,
        public FreelancerReview:string,
        public FreelancerStars:number,
        public Client:UserChild,
        public Freelancer:UserChild
        ){}
}