<template>
  <div>
    <!-- Stats Card Horizontal -->
    <b-row>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-horizontal
          icon="CpuIcon"
          :statistic="statistic.total_client"
          statistic-title="Total Client"
        />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-horizontal
          icon="ServerIcon"
          color="success"
          :statistic="statistic.total_payee"
          statistic-title="Total Payee"
        />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-horizontal
          icon="ActivityIcon"
          color="danger"
          :statistic="statistic.total_sale"
          statistic-title="Total Sale"
        />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-horizontal
          icon="AlertOctagonIcon"
          color="warning"
          :statistic="statistic.total_expenses"
          statistic-title="Total Expense"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import axiosIns from '@/libs/axios'

export default {
  components: {
    StatisticCardHorizontal,
  },
  data() {
    return {
      statistic: '',
      transactions: [],
    }
  },
  mounted() {
    this.getStatistic()
    // this.getTransactionReport()
  },
  methods: {
    getStatistic() {
      axiosIns.get('api/v1/shop/report').then(response => {
        // console.log(response.data)
        this.statistic = response.data.data
      })
    },
    // getTransactionReport() {
    //   axiosIns.get('api/v1/shop/report/transaction').then(response => {
    //     // console.log(response.data.transactions)
    //     this.transactions = response.data.transactions
    //   })
    // },
  },
}
</script>

<style>

</style>
