export default {
    isAuthenticated (state, data) {
        state.isAuthenticated = data
    },
    user (state, data) {
        state.user = data
    },
    token(state,data){
        state.token = data
    },
    loginFormErrors(state, data){
        state.loginFormErrors = data
    },
    loginResponseError(state, data){
        state.loginResponseError = data
    },
    todo(state, data){
        state.todo = data
    },
    todoPagination(state, data){
        state.todoPagination = data
    },
    todoError(state, data){
        state.todoError = data
    },
    todoCurrentLink(state, data){
        state.todoCurrentLink = data
    },
    todoAddTask(state, data){
        state.todo.push(...data)
    },
    inprogress(state, data){
        state.inprogress = data
    },
    inprogressPagination(state, data){
        state.inprogressPagination = data
    },
    inprogressError(state, data){
        state.inprogressError = data
    },
    inprogressCurrentLink(state, data){
        state.inprogressCurrentLink = data
    },
    inprogressAddTask(state, data){
        state.inprogress.push(...data)
    },
    done(state, data){
        state.done = data
    },
    donePagination(state, data){
        state.donePagination = data
    },
    doneError(state, data){
        state.doneError = data
    },
    doneCurrentLink(state, data){
        state.doneCurrentLink = data
    },
    doneAddTask(state, data){
        state.done.push(...data)
    },

}
