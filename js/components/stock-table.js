Vue.component('ba-stock-table',{

  props:['items','upbjj','kategori'],
  data(){
    return{
      keyword:'',
      sortBy:'judul'
    }
  },

  computed:{
    filteredItems(){
      return this.items
      .filter(item =>
        item.judul
        .toLowerCase()
        .includes(this.keyword.toLowerCase())
      )
    }
  },

  template:`
  <div>
    <h2>Stok Bahan Ajar</h2>
    <input
      v-model="keyword"
      placeholder="Cari buku..."
    >

    <table border="1">
      <thead>
        <tr>
          <th>Kode</th>
          <th>Judul</th>
          <th>Qty</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>

        <tr
          v-for="item in filteredItems"
          :key="item.kode"
        >
          <td>{{ item.kode }}</td>
          <td>{{ item.judul }}</td>
          <td>{{ item.qty }}</td>
          <td>
            <status-badge
              :qty="item.qty"
              :safety="item.safety"
            >
            </status-badge>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `
})