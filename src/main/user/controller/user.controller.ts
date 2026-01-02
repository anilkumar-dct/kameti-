import { ipcMain } from "electron";
import { UserService, userServices } from "../services/user.services";




export class userController{

    constructor(private userservice:UserService){
        this.registerHandlers()
    }

    private registerHandlers():void{
         ipcMain.handle("user:create",this.)
        ipcMain.handle("user:delete",async(_,id:number)=>{
            return userServices.deleteUser(id)
        })
        ipcMain.handle("user:update",async(_,id:number,data)=>{
            return userServices.updateUser(id,data)
        })         
    }
    

    register(){
        ipcMain.handle("user:create",async(_,data)=>{
            return userServices.createUser(data)
        })
        ipcMain.handle("user:delete",async(_,id:number)=>{
            return userServices.deleteUser(id)
        })
        ipcMain.handle("user:update",async(_,id:number,data)=>{
            return userServices.updateUser(id,data)
        })          
    }
}