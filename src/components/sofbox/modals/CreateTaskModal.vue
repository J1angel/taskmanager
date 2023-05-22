<template>
  <div>
    <b-button class="btn-lg" variant="success" @click="openAddTask"><i class="ri-add-fill"></i>ADD TASK</b-button>
    <b-modal id="modal-1"  ref="modal-1" title="Create Task" hide-footer>
      <b-form-group class="col-md-12 position-relative input-margin"
                    label="Title"
      >
        <b-form-input v-model="task.title"   :class="{ 'input-border-error': createError && createError.title}" />
        <span class="position-absolute input-error font-italic" v-if="createError && createError.title"> {{createError.title[0]}}</span>
      </b-form-group>
      <b-form-group class="col-md-12 position-relative input-margin"
                    label="Description"
      >
        <b-form-textarea
            id="textarea"
            v-model="task.description"
            rows="8"
            class="line-spacing-textarea"
            :class="{ 'input-border-error': createError && createError.description}"
        ></b-form-textarea>
        <span class="position-absolute input-error font-italic" v-if="createError && createError.description"> {{createError.description[0]}}</span>
      </b-form-group>
      <b-form-group class="col-md-12 position-relative"
                    label="Due Date"
      >
        <b-form-datepicker v-model="task.dueDate" :min="new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate())" locale="en"
                           :class="{ 'input-border-error': createError && createError.dueDate}"></b-form-datepicker>
        <span class="position-absolute input-error font-italic" v-if="createError && createError.dueDate"> {{createError.dueDate[0]}}</span>
      </b-form-group>
      <b-button class="float-right" variant="primary" @click="sumbitTask">Create</b-button>
    </b-modal>
  </div>

</template>
<script>
import TaskApi from '@/taskapi/task';
import store from '@/store'
export default {
  data:function (){
    return{
      task:{
        title:'',
        description:'',
        dueDate:'',
      },
      createError:null,
    }
  },
  methods:{
      openAddTask(){
        this.$refs['modal-1'].show()
      },
      sumbitTask(){
        TaskApi.addTask(this.task).then(()=>{
          this.task ={title:'', description:'', dueDate:'',}
          this.$refs['modal-1'].hide()
          store.dispatch('TaskData/getTaskTodo')
        }).catch(error => {
          this.createError = error.response.data.errors
        })
      }

  }
}
</script>
<style scoped>
.input-error{
  font-size: 10px;
  color: red;
}
.input-margin{
  margin-bottom: 20px;
}
.input-border-error{
  border: 1px solid red;
}
.line-spacing-textarea{
  line-height: 1.5;
  resize: none;
}
</style>
