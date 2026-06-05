Vue.component('app-modal',{

  data(){
    return{
      tampil:false,
      pesan:''
    }
  },

  methods:{
    buka(text){
      this.tampil = true
      this.pesan = text
    },
    tutup(){
      this.tampil = false
    }
  },

  template:`
  <div
    v-if="tampil"
    class="modal"
  >
    <div class="modal-content">
      <p>{{ pesan }}</p>
      <button @click="tutup">
        Tutup
      </button>
    </div>
  </div>
  `
})