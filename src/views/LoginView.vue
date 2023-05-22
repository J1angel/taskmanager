<template>
  <div class="login-container">
    <div class="card-layout">
        <lottie :option="require('@/assets/images/small/login')" class="lottie-size"></lottie>
      <div class="position-relative ">
        <h2 class="mb-0" style="text-align: center;color: white">Task Management</h2>
        <div class="position-absolute response-error"><span> {{loginResponseError}}</span></div>

      </div>

        <div class="form-group position-relative input-position">
          <label for="exampleInputEmail1" style="color: white">Email address</label>
          <input type="email"
                 class="form-control mb-0" id="exampleInputEmail1"
                 aria-describedby="emailHelp"
                 v-model="credentials.email"
          >
          <span class="position-absolute input-error"> {{emailError[0]}}</span>

        </div>
        <div class="form-group position-relative">
          <label for="exampleInputPassword1" style="color: white">Password</label>
          <input type="password"
                 class="form-control mb-0"
                 id="exampleInputPassword1"
                 v-model="credentials.password">
          <span class="position-absolute input-error">{{passwordError[0]}}</span>
        </div>


        <div class="d-inline-block w-100 input-position">
          <button class="btn btn-primary btn-block" @click="proceedLogin">Sign in</button>
        </div>

    </div>

  </div>

</template>
<script>
import store from '@/store'
import {sofbox} from "@/config/pluginInit";
export default {
  name: 'LoginPage',
  mounted() {
    sofbox.index()
  },
  data:function(){
    return{
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  computed:{
    emailError(){
      if(store.getters["TaskData/loginFormErrors"].email){
        return store.getters["TaskData/loginFormErrors"].email
      }
      return []
    },
    passwordError(){
      if(store.getters["TaskData/loginFormErrors"].password){
        return store.getters["TaskData/loginFormErrors"].password
      }
      return []
    },
    loginResponseError(){
      return store.getters["TaskData/loginResponseError"]
    }
  },
  methods:{
    proceedLogin(){
      store.dispatch("TaskData/clearErrors")
      if(store.getters["TaskData/isAuthenticated"]){
        this.$router.push('/dashboard')
      }else{
        store.dispatch('TaskData/loginAction', this.credentials)
      }

    }
  }
}
</script>
<style scoped>
.login-container{
  display: flex;
  justify-content: center;
  height:100vh;
}
.card-layout{
  width: 350px;
  height: 590px;
  background-color: maroon;
  border-radius: 20px 0px;
  padding:25px 20px;
  margin-top:10%;
}
.lottie-size{
  width: 300px;
  height: 250px
}
.error{
  border:1px solid red
}
.response-error{
  display: flex;
  justify-content: center;
  width: 100%;
  top: 35px;
  font-size: 12px;
  color: lightpink;
}
.input-position{
  margin-top: 10px;
}
.input-error{
  width: 100%;
  font-size: 12px;
  color: lightpink;
  text-align: right;
}
</style>
