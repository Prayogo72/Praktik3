Vue.component('do-tracking',{
  props: ['tracking'],
  data(){
    return {
      keyword: '',
      hasil: null,
      dicari: false,
      newDO: {
        nim: '',
        nama: '',
        ekspedisi: 'JNE Regular',
        paket: 'PAKET-UT-001'
      },
      progress: ''
    }
  },

  computed: {
    nomorBaru(){
      let nomor = this.tracking.length + 1
      return `DO2026-${String(nomor).padStart(3, '0')}`
    }
  },

  watch: {
    keyword(value){
      console.log('Cari:', value)
    },
    progress(value){
      console.log('Progress:', value)
    }
  },

  methods: {
    cari(){
      this.hasil = null
      this.dicari = false
      const kataKunci = this.keyword.trim().toUpperCase()

      if (!kataKunci) return

      this.tracking.forEach(item => {
        const key = Object.keys(item)[0]
        const data = item[key]
        
        if(
          key.toUpperCase() === kataKunci || 
          String(data.nim) === kataKunci
        ){
          this.hasil = {
            nomorDO: key,
            detail: data
          }
        }
      })
      this.dicari = true
    },

    reset(){
      this.keyword = ''
      this.hasil = null
      this.dicari = false
    },

    tambahDO(){
      if(!this.newDO.nim || !this.newDO.nama) {
        alert('NIM dan Nama harus diisi!')
        return
      }

      const nomor = this.nomorBaru
      this.tracking.push({
        [nomor]: {
          nim: this.newDO.nim,
          nama: this.newDO.nama,
          status: 'Diproses',
          ekspedisi: this.newDO.ekspedisi,
          tanggalKirim: new Date().toLocaleDateString(),
          paket: this.newDO.paket,
          total: 120000,
          perjalanan: [
            {
              waktu: new Date().toLocaleString(),
              keterangan: 'Pesanan dibuat'
            }
          ]
        }
      })
      alert('DO berhasil dibuat')
      this.newDO.nim = ''
      this.newDO.nama = ''
    }, 

    tambahProgress(){
      if(!this.hasil || !this.progress) return
      
      this.hasil.detail.perjalanan.push({
        waktu: new Date().toLocaleString(),
        keterangan: this.progress
      })
      this.progress = ''
    }
  },

  template: `
  <div>
    <h2>Tracking DO</h2>
    <input
      v-model="keyword"
      @keyup.enter="cari"
      @keyup.esc="reset"
      placeholder="Cari Nomor DO / NIM"
    >
    <button @click="cari">Cari</button>
    <button @click="reset">Reset</button>

    <div v-if="hasil">
      <hr>
      <div>
        <h3>Nomor DO: {{ hasil.nomorDO }}</h3>
        <p>NIM: {{ hasil.detail.nim }}</p>
        <p>Nama: {{ hasil.detail.nama }}</p>
        <p>Status: {{ hasil.detail.status }}</p>
        <p>Ekspedisi: {{ hasil.detail.ekspedisi }}</p>
        <p>Paket: {{ hasil.detail.paket }}</p>
        
        <h4>Perjalanan</h4>
        <ul>
          <li v-for="item in hasil.detail.perjalanan">
            {{ item.waktu }} - {{ item.keterangan }}
          </li>
        </ul>
      </div>

      <hr>
      <h4>Tambah Progress</h4>
      <input
        v-model="progress"
        @keyup.enter="tambahProgress"
        placeholder="Status perjalanan"
      >
      <button @click="tambahProgress">Tambah</button>
    </div>

    <div v-else-if="dicari">
      Data tidak ditemukan
    </div>

    <hr>
    <h3>Tambah Delivery Order</h3>
    <p>Nomor DO: {{ nomorBaru }}</p>

    <input v-model="newDO.nim" placeholder="NIM">
    <input v-model="newDO.nama" placeholder="Nama">

    <select v-model="newDO.ekspedisi">
      <option>JNE Regular</option>
      <option>JNE Express</option>
    </select>

    <button @click="tambahDO">Simpan DO</button>
  </div>
  `
})
