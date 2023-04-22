export class UpdateProjectPost{

  constructor (public postTitle:string,public description:string,
    public averagePrice :number,
    public categoryId :number){}
}
//2-UpdateProjectPost
// "URL"="https://localhost:7047/api/ProjectPosts/Update/{ProjectPostID}";
// "Method"="PUT"
// "Authorization"="Bearer Token" // client
// object1 ={
//   "postTitle": "update22",
//   "description": "sadasd",
//   "averagePrice": 3600,
//   "categoryId": 1
// };
// "content-type"="application/json"

// "Response"={
//   "message": "Project Post Updated Successfully"||"Somethign went wrong..."

// }
