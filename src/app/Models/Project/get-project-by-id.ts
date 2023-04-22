export class GetProjectById{
    constructor (public P_Id:number, 
        public Title:string,
        public Description:string,
        public Date: Date,
        public SystemProject :boolean,
        public MoneyEarned : number){}
}