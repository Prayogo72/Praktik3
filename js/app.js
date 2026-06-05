new Vue({
  el: "#app",
  data: {
    tab: "stok",
    state: {
      stok: [],
      tracking: [], // Pastikan ini berbentuk array []
      paket: [],
      pengirimanList: [],
      upbjjList: [],
      kategoriList: []
    }
  },
  async created(){
    const data = await api.getData()
    this.state.stok = data.stok || []
    this.state.tracking = data.tracking || []
    this.state.paket = data.paket || []
    this.state.pengirimanList = data.pengirimanList || []
    this.state.upbjjList = data.upbjjList || []
    this.state.kategoriList = data.kategoriList || []
  }
})