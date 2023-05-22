import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
    isAuthenticated: false,
    user: {},
    token:'',
    loginFormErrors:[],
    loginResponseError:'',
    todo:[],
    todoPagination:[],
    todoError:null,
    todoCurrentLink:null,
    inprogress:[],
    inprogressPagination:[],
    inprogressError:null,
    inprogressCurrentLink:null,
    done:[],
    donePagination:[],
    doneError:null,
    doneCurrentLink:null,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
