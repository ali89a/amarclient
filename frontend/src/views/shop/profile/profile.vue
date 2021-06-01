<template>
  <b-tabs
    vertical
    content-class="col-12 col-md-9 mt-1 mt-md-0"
    pills
    nav-wrapper-class="col-md-3 col-12"
    nav-class="nav-left"
  >

    <!-- general tab -->
    <b-tab active>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="UserIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">General</span>
      </template>

      <account-setting-general
        :general-data="options.general"
      />
    </b-tab>
    <!--/ general tab -->
  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import AccountSettingGeneral from './AccountSettingGeneral.vue'

export default {
  components: {
    BTabs,
    BTab,
    AccountSettingGeneral,
  },
  data() {
    return {
      options: {},
    }
  },
  beforeCreate() {
    // this.$http.get('/account-setting/data').then(res => { this.options = res.data })
  },
}
</script>
