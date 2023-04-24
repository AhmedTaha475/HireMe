export class CreateProjectPost{

  constructor (public postTitle:string,public description:string,
    public averagePrice :number,
    public categoryId :number){}
}
//1-Create Project Post
// "URL"="https://localhost:7047/api/ProjectPosts/Create";
// "Method"="POST"
// "Authorization"="Bearer Token" // client
// object1 ={
//   "postTitle": "Test",
//   "description": "test",
//   "averagePrice": 2500,
//   "categoryId": 1
// };
// "content-type"="application/json"

// "Response"={
//   "message": "Project Post Created Successfully"||"Somethign went wrong..."

// }




// //5-GetAllProjectPosts
// "URL"="https://localhost:7047/api/ProjectPosts/GetAll";
// "Method"="GET"

// object1 =[
//   {
//     "id": 0,
//     "postTitle": "string",
//     "description": "string",
//     "averagePrice": 0,
//     "categoryId": 0
//   }
// ];
// "content-type"="application/json"

// "Response"={
//   "message": "No Project posts found"

// }


// //6-GetProjectPostById
// "URL"="https://localhost:7047/api/ProjectPosts/GetProjectPostById/{ProjectPostID}}";
// "Method"="GET"

// object1 ={
//   "id": 0,
//   "postTitle": "string",
//   "description": "string",
//   "averagePrice": 0,
//   "categoryId": 0
// };
// "content-type"="application/json"

// "Response"={
//   "message": "Project post not found"

// }
