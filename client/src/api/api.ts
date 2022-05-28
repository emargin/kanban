import instance from "./instance"


interface IAuthRequest {
    email: string,
    password: string
}

interface IRegRequest extends IAuthRequest{
    username: string
}

export const API = {
    fetchAuth (request: IAuthRequest){
        return instance.post('/login', request)
    },
    fetchReg (request: IRegRequest) {
        return instance.post('/registration', request)  
    },
    sighOut() {
        return instance.get('/logout')
    },
    fetchCreateNewTask(newTask: any) {
        return instance.post('/tasks', newTask)
    },
    fetchTasks() {
        return instance.get('/tasks')
    },
    fetchTaskStatuses () {
        return instance.get('/statuses')
    },
    fetchTaskPriority() {
        return instance.get('/priority')
    },
    fetchUsers() {
        return instance.get('/users')
    },
    fetchBoards() {
        return instance.get('/board')
    }
}