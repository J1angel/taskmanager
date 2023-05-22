import AuthApi from '@/taskapi/auth'
import TaskApi from '@/taskapi/task'
import router from "@/router";
export default {
    loginAction(context, payload){
        AuthApi.getLogin(payload).then(response => {
            context.commit('isAuthenticated', response.data.logged)
            context.commit('token', response.data.access_token)
            AuthApi.user(context.getters.token).then(response => {
                context.commit('user', response.data)
                router.push('/dashboard')
            }).catch(error => {
                console.log(error)
                router.push('/')
            })
        }).catch(error => {
            if(error.response.status === 401){
                context.commit('loginResponseError', error.response.data.message)
            }else{
                context.commit('loginFormErrors', error.response.data.errors)
            }

        })
    },
    clearErrors(context){
        context.commit('loginFormErrors', '')
        context.commit('loginResponseError', '')
    },
    getTaskTodo(context){
        TaskApi.getTodo().then(response => {
            context.commit('todo', response.data.data)
            context.commit('todoPagination', response.data.meta.links)
            context.commit('todoCurrentLink', 1)
            context.commit('todoError', null)
        }).catch(error => {
            context.commit('todoError', error.response.data.message)
        })
    },
    getPaginateTaskTodo(context,payload){
        TaskApi.getTaskUrl(payload).then(response => {
            context.commit('todoAddTask', response.data.data)
            context.commit('todoCurrentLink', context.getters["todoCurrentLink"]+1)
            context.commit('todoError', null)
        }).catch(error => {
            context.commit('todoError', error.response.data.message)
        })
    },
    getTaskInprogress(context){
        TaskApi.getInprogress().then(response => {
            context.commit('inprogress', response.data.data)
            context.commit('inprogressPagination', response.data.meta.links)
            context.commit('inprogressCurrentLink', 1)
            context.commit('inprogressError', null)
        }).catch(error => {
            context.commit('inprogressError', error.response.data.message)
        })
    },
    getPaginateTaskInprogress(context,payload){
        TaskApi.getTaskUrl(payload).then(response => {
            context.commit('inprogressAddTask', response.data.data)
            context.commit('inprogressCurrentLink', context.getters["inprogressCurrentLink"]+1)
            context.commit('inprogressError', null)
        }).catch(error => {
            context.commit('inprogressError', error.response.data.message)
        })
    },
    getTaskDone(context){
        TaskApi.getDone().then(response => {
            context.commit('done', response.data.data)
            context.commit('donePagination', response.data.meta.links)
            context.commit('doneCurrentLink', 1)
            context.commit('doneError', null)
        }).catch(error => {
            context.commit('doneError', error.response.data.message)
        })
    },
    getPaginateTaskDone(context,payload){
        TaskApi.getTaskUrl(payload).then(response => {
            context.commit('doneAddTask', response.data.data)
            context.commit('doneCurrentLink', context.getters["todoCurrentLink"]+1)
            context.commit('doneError', null)
        }).catch(error => {
            context.commit('doneError', error.response.data.message)
        })
    },
    changeTaskStatus(context, payload){
        TaskApi.changeTaskStatus(payload).catch(error => {
            if (payload.status === 'todo'){
                context.commit('todoError', error.response.data.message)
            }else if(payload.status === 'inprogress'){
                context.commit('inprogressError', error.response.data.message)
            }else if(payload.status === 'done'){
                context.commit('doneError', error.response.data.message)
            }

        })
    },
    logout(){
        localStorage.clear()
        window.location.href = "http://localhost:8080/";
    }
}
