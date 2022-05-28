import instance from "./instance"


export const API = {
    getUsers(){
        return instance.get('users')
    }
}