import { UserChild } from "../ProjectReview/user-child";

export class Getallprojectcomments {
  constructor(public commentID: number, public comment: string ,public clientChild :UserChild) {}
}
