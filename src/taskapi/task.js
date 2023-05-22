import Api from './axios';
import PaginateApi from './taskpaginationaxios'
import store from '@/store';
export default {
    addTask(data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.getters["TaskData/token"]}`;
        return Api().post('/task/create', data)
    },
    getTodo(){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.getters["TaskData/token"]}`;
        return Api().get('/todo')
    },
    getInprogress(){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.getters["TaskData/token"]}`;
        return Api().get('/inprogress')
    },
    getDone(){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.getters["TaskData/token"]}`;
        return Api().get('/done')
    },
    getTaskUrl(url){
        PaginateApi().defaults.headers.common["Authorization"] = `Bearer ${store.getters["TaskData/token"]}`;
        return PaginateApi().get(url)
    },
    changeTaskStatus(data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.getters["TaskData/token"]}`;
        return Api().post(`/task-change-status/${data.id}/${data.status}`)
    },
    updateTask(data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.getters["TaskData/token"]}`;
        return Api().post(`/task/${data.id}`, data)
    },
    deleteTask(id){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.getters["TaskData/token"]}`;
        return Api().post(`/delete/${id}`)
    }
}
