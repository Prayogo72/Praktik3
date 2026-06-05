Vue.component('order-form',{

  props:[
    'paket',
    'ekspedisi',
    'tracking'
  ],
  data(){
    return{
      nama:'',
      nim:'',
      selectedPaket:'',
      selectedEkspedisi:''
    }
  },

  computed:{
    nomorBaru(){
      let nomor = this.tracking.length + 1
      return `DO2026-${String(nomor).padStart(3,'0')}`
    }
  },

  methods:{
    simpan(){
      if(
        !this.nama ||
        !this.nim ||
        !this.selectedPaket ||
        !this.selectedEkspedisi
      ){
        alert('Lengkapi data dulu')
        return
      }

      const nomor = this.nomorBaru
      
      const dataBaru = {
        [nomor]: {
          nim: this.nim,
          nama: this.nama,
          status: 'Diproses',
          ekspedisi: this.selectedEkspedisi,
          tanggalKirim: new Date().toISOString().split('T')[0],
          paket: this.selectedPaket,
          total: 120000,
          perjalanan:[
            {
              waktu: new Date().toLocaleString(),
              keterangan: 'Pesanan berhasil dibuat'
            }
          ]
        }
      }

      this.tracking.push(dataBaru)

      alert(
        'Pemesanan berhasil\n\n'+
        'Nomor DO: '+nomor
      )
      
      this.nama=''
      this.nim=''
      this.selectedPaket=''
      this.selectedEkspedisi=''
    }
  },

  template:`
  <div>
    <h2>Form Pemesanan</h2>
    <input
      v-model="nim"
      placeholder="NIM"
    >
    <input
      v-model="nama"
      placeholder="Nama Mahasiswa"
    >
    <select
      v-model="selectedPaket"
    >
      <option value="">
        Pilih Paket
      </option>

      <option
        v-for="item in paket"
        :value="item.nama"
      >
        {{ item.nama }}
      </option>
    </select>

    <select
      v-model="selectedEkspedisi"
    >
      <option value="">
        Pilih Ekspedisi
      </option>

      <option
        v-for="item in ekspedisi"
        :value="item.nama"
      >
        {{ item.nama }}
      </option>
    </select>

    <br><br>

    <button @click="simpan">
      Simpan
    </button>
  </div>
  `
})