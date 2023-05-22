import Api from './axios';
export default {
    getLogin: function (data){
        return Api().post('/login',data)
    },
    user: function(token){
        Api().defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return Api().get('/user')
    },

}
