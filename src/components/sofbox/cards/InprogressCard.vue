<template>
  <iq-card class-name="dash-hover-gradient1 iq-card-card inprogress"
           header-bg-color="transparent"
           header-class="d-flex justify-content-between border-0"
           body-class="body-scroll"
  >
    <template v-slot:headerTitle>
      <div class="mb-0 card-item-position inprogress-title-design">
        <i class="ri-pencil-ruler-fill font-weight-light font-size-32 "  style="color: mediumblue"></i>
        <div class="inprogress-title">
          <span>IN-PROGRESS</span>
        </div>
      </div>
    </template>
    <template v-slot:body >
      <draggable v-model="inprogress" group="people" @change="log">
        <div v-for="(task, index) in inprogress" :key="index" class="notepad-body">
          <div style="width: 100%">
            <div class="float-right" v-if="userId === task.owner.id">
              <i class="ri-edit-2-fill text-primary ri-lg"  @click="openEdit(task)"></i>
              <i class="ri-delete-bin-2-fill text-danger ri-lg"  @click="openDelete(task)"></i>
            </div>
            <div class="font-size-12 font-italic">Due: {{task.due_date | moment('MMMM DD, YYYY')}}</div>
            <div class="font-weight-bold font-size-14">{{task.title}}</div>
            <div class="font-italic float-right font-size-12">{{task.owner.name}}</div>
          </div>
        </div>
      </draggable>
      <div v-observe-visibility="handleScrolledToBottom"></div>
      <div class="text-center" v-if="inprogressError"><span>{{inprogressError}}</span></div>
    </template>
    <b-modal id="modal-2"  ref="modal-2" title="Edit Task" hide-footer>
      <div v-if="editDetails">
        <b-form-group class="col-md-12 position-relative input-margin"
                      label="Title"
        >
          <b-form-input v-model="editDetails.title"   :class="{ 'input-border-error': createError && createError.title}" />
          <span class="position-absolute input-error font-italic" v-if="createError && createError.title"> {{createError.title[0]}}</span>
        </b-form-group>
        <b-form-group class="col-md-12 position-relative input-margin"
                      label="Description"
        >
          <b-form-textarea
              id="textarea"
              v-model="editDetails.description"
              rows="8"
              class="line-spacing-textarea"
              :class="{ 'input-border-error': createError && createError.description}"
          ></b-form-textarea>
          <span class="position-absolute input-error font-italic" v-if="createError && createError.description"> {{createError.description[0]}}</span>
        </b-form-group>
        <b-form-group class="col-md-12 position-relative"
                      label="Due Date"
        >
          <b-form-datepicker v-model="editDetails.due_date" :min="new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate())" locale="en"
                             :class="{ 'input-border-error': createError && createError.dueDate}"></b-form-datepicker>
          <span class="position-absolute input-error font-italic" v-if="createError && createError.dueDate"> {{createError.dueDate[0]}}</span>
        </b-form-group>
        <b-button class="float-right" variant="primary" @click="sumbitTask">Update</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-3"  ref="modal-3" title="Delete Task" hide-footer>
      <div v-if="deleteTaskDetails">Are you sure you want to delete {{ deleteTaskDetails.title}}?</div>
      <b-button class="float-right" variant="danger" @click="submitDelete">Yes</b-button>
    </b-modal>
  </iq-card>
</template>
<script>
import store from '@/store';
import IqCard from "@/components/sofbox/cards/iq-card";
import draggable from 'vuedraggable';
import TaskApi from "@/taskapi/task";
export default {
  components: {IqCard,draggable},
  data:function (){
    return{
      editDetails:null,
      createError:null,
      deleteTaskDetails:null
    }
  },
  created() {
    store.dispatch('TaskData/getTaskInprogress')
  },
  computed: {
    inprogress:{
      get:function (){
        return store.getters["TaskData/inprogress"]
      },
      set:function (newValue){
        store.commit('TaskData/inprogress', newValue)
      }

    },
    currentLink(){
      return store.getters["TaskData/inprogressCurrentLink"]
    },
    pagination(){
      return store.getters["TaskData/inprogressPagination"]
    },
    inprogressError(){
      return store.getters["TaskData/inprogressError"]
    },
    userId(){
      return store.getters["TaskData/user"].id
    }
  },
  methods:{
    handleScrolledToBottom(isVisible) {
      if (isVisible){
        if(this.pagination && this.pagination[this.currentLink+1] && this.pagination[this.currentLink+1].label !== 'Next &raquo;'){
          store.dispatch("TaskData/getPaginateTaskInprogress",this.pagination[this.currentLink+1].url)
        }
      }

    },
    log: function(evt) {
      if(evt.added){
        let changeDetails = {
          id: evt.added.element.id,
          status: 'inprogress'
        }
        store.dispatch('TaskData/changeTaskStatus', changeDetails)
      }
    },
    openEdit(task){
      this.editDetails = Object.assign({}, task)
      this.$refs['modal-2'].show()
    },
    sumbitTask(){
      TaskApi.updateTask(this.editDetails).then(()=>{
        store.dispatch('TaskData/getTaskInprogress')
        this.createError = null
      }).catch(error => {
        this.createError = error.response.data.errors
      })
    },
    openDelete(task){
      this.deleteTaskDetails = Object.assign({}, task)
      this.$refs['modal-3'].show()
    },
    submitDelete(){
      TaskApi.deleteTask(this.deleteTaskDetails.id).then(()=>{
        store.dispatch('TaskData/getTaskInprogress')
        this.$refs['modal-3'].hide()
      })
    }
  }

}
</script>
<style>
.card-item-position{
  display: flex;
  align-items: center
}
.inprogress{
  background-color: lightsteelblue;
  border: 1px solid mediumblue;
}
.inprogress-title{
  font-size: 25px;
  margin-left: 5px;
  font-weight: 900;
  color: mediumblue;
}
.inprogress-title-design{
  border-bottom: 1px solid mediumblue;
}
.body-scroll{
  height: calc(100vh - 195px);
  overflow-y: auto;
}
.notepad-body{
  padding: 15px 20px;
  background-color: white;
  margin-bottom: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
.notepad-body:hover{
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}
.drag-size{
  height: calc(100vh - 235px);
}
</style>
