Vue.component('status-badge',{

  props:['qty','safety'],

  computed:{
    status(){
      if(this.qty > this.safety){
        return 'Aman'
      }
      else if(this.qty > 0){
        return 'Menipis'
      }
      else{
        return 'Kosong'
      }
    }
  },

  template:`
    <span
      :class="status.toLowerCase()"
    >
      {{ status }}
    </span>
  `
})