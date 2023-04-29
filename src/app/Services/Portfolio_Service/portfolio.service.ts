import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StaticURl } from 'src/app/Models/static-url';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  Url: any = StaticURl.URL + 'Portfolio/';
  constructor(public client:HttpClient) { }
  CreatePortfolio(freelancerId:number) {
    return this.client.post(this.Url+freelancerId,"");
  }
  DeletePortfolio(portId:number){
    return this.client.delete(this.Url+portId)
  }
  GetPortfolioById(portId:number) {
    return this.client.get(this.Url+portId);
  }
  GetAllPortfolio(){
    return this.client.get(this.Url)
  }

}

//#region Portofolio
//1-Add Portfolio
// "URL"="https://localhost:7047/api/Portfolio/{freelancerId}";
// "Method"="POST"
// "Authorization"="Bearer Token" // Freelancer

// "content-type"="application/json"

// "Response"={
//   "message":"Something went wrong"

// }



//2-Delete Portfolio
// "URL"="https://localhost:7047/api/Portfolio/{PortfolioId}";
// "Method"="DELETE"
// "Authorization"="Bearer Token" // Freelancer

// "content-type"="application/json"

// "Response"={
//   "message": "Portfoli was deleted successfully" ||"No portfolio with that id"

// }
//3-GetPortfolioById
// "URL"="https://localhost:7047/api/Portfolio/{PortfolioId}";
// "Method"="GET"
// "Authorization"="Bearer Token"
// object1 ={
//   "portId": 2,
//   "freelancerId": "33ddb320-4f22-4324-bfb6-ea7c73f6ca65"
// };
// "content-type"="application/json"

// "Response"={
//   "message": "Not portfolio was found"

// }
//4-GetAllPortfolio
// "URL"="https://localhost:7047/api/Portfolio";
// "Method"="GET"
// "Authorization"="Bearer Token"
// object1 =[
//   {
//     "portId": 0,
//     "freelancerId": "string"
//   }
// ];
// "content-type"="application/json"

// "Response"={
//   "message": "No portfolios were found"

// }
//#endregion
