export class UpdateFreelancerProfile {
  constructor(
    public firstname:string,
    public lastname:string,  
    public username:string,
    public country:string,
    public city:string,
    public street:string,
    public age: number,
    public ssn:string,
    public paymentmethodId:number,
    public categoryId:number,
    public email:string,
    public jobtitle:string,
    public description:string,
    public phonenumber:string,
    public image:string,
    public cv:string,
 ) {
   
}
}