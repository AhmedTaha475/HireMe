import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateProject } from 'src/app/Models/Project/update-project-by-id';
import { CreateProjectComment } from 'src/app/Models/ProjectComment/CreateProjectComment';
import { UpdateProjectComment } from 'src/app/Models/ProjectComment/UpdateProjectComment';
import { StaticURl } from 'src/app/Models/static-url';

@Injectable({
  providedIn: 'root'
})
export class ProjectCommentService {
  Url: any = StaticURl.URL + 'ProjectComments/';
  constructor(public client:HttpClient) { }
  CreateProjectComment(projectComments:CreateProjectComment) {
    return this.client.post(this.Url,projectComments);
  }
  GetAllProjectComments(projectId:number) {
    return this.client.get(this.Url+projectId);
  }
  UpdateProjectComment(projectId:number , projectComment :UpdateProjectComment){
    return this.client.put(this.Url+projectId,projectComment)
  }
  DeleteProjectComment(commentId:number){
    return this.client.delete(this.Url+commentId)
  }

}


//#region ProjectComment
//1-Create Project comment
// "URL"="https://localhost:7047/api/ProjectComments";
// "Method"="POST"
// "Authorization"="Bearer Token" // client
// object1 ={
//   "comment": "Hello is it me your looking for",
//   "projectId": 5,
//   "clientId": "7e0121d2-acc1-4775-a14f-193af638028a"
// };
// "content-type"="application/json"

// "Response"={
//   "message": "Comment added successfully"||"Somethign went wrong..."

// }

//2-Getallprojectcomments by project id
// "URL"="https://localhost:7047/api/ProjectComments/{ProjectID}";
// "Method"="GET"
// "Authorization"="Bearer Token"
// object1 =[
//   {
//       "commentID": 14,
//       "comment": "Hello is it me your looking for",
//       "clientChild": {
//           "id": "7e0121d2-acc1-4775-a14f-193af638028a",
//           "fName": "updatedClient",
//           "lName": "freelancer",
//           "img": null
//       }
//   }
// ];
// "content-type"="application/json"

// "Response"={
//   "message":"No comments found"

// }


//3-UpdateProjectComment
// "URL"="https://localhost:7047/api/ProjectComments/{ProjectID}";
// "Method"="PUT"
// "Authorization"="Bearer Token" //Client
// object1 ={
//   "commentId": 14,
//   "comment": "string"
// };
// "content-type"="application/json"

// "Response"={
//   "message": "comment updated successfully"||"comment not found"

// }

// //4-Delete ProjectComment by CommentId
// "URL"="https://localhost:7047/api/ProjectComments/{CommentID}";
// "Method"="DELETE"
// "Authorization"="Bearer Token" //Client , Admin

// "content-type"="application/json"

// "Response"={
//   "message": "Comment not found"

// }

//#endregion
