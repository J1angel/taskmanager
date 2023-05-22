<template>
  <b-container fluid>
    <b-row class="row-eq-height">
      <b-col md="4">
          <Todo />
      </b-col>
      <b-col md="4">
          <Inprogress/>
      </b-col>
      <b-col md="4">
          <DoneCard/>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import {sofbox} from "@/config/pluginInit";
import DoneCard from "@/components/sofbox/cards/DoneCard";
import Inprogress from "@/components/sofbox/cards/InprogressCard";
import Todo from "@/components/sofbox/cards/TodoCard";
export default {
  components:{
    Todo, DoneCard, Inprogress
  },
  mounted() {
    sofbox.index()
  }
}
</script>

