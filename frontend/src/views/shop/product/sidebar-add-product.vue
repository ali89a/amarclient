<template>
  <b-sidebar
    id="sidebar-add-product"
    ref="createClientSidebar"
    sidebar-class="sidebar-lg"
    bg-variant="white"
    shadow
    backdrop
    no-header
    right
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add Product
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>

      <!-- Body -->
      <validation-observer ref="createproduct">
        <b-form class="p-2">
          <b-form-group label="Name">
            <validation-provider
              #default="{ errors }"
              name="name"
              rules="required"
            >
              <b-form-input
                v-model="form.name"
                :state="errors.length > 0 ? false:null"
                placeholder="Name"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group label="Sku">
            <validation-provider
              #default="{ errors }"
              name="sku"
              rules="required"
            >
              <b-form-input
                v-model="form.sku"
                :state="errors.length > 0 ? false:null"
                placeholder="Sku"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
              @click.prevent="productCreate"
            >
              Add
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="outline-secondary"
              @click="hide"
            >
              Cancel
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'
import axiosIns from '@/libs/axios'

export default {
  name: 'SidebarAddProduct',
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },

  data() {
    return {
      form: {
        name: '',
        sku: '',
      },
    }
  },
  watch: {
    $route() {
      this.addInvoiceLog()
    },
  },

  created() {
    // this.addInvoiceLog()
  },
  methods: {
    productCreate() {
      this.$refs.createproduct.validate().then(success => {
        if (success) {
          axiosIns.post('api/v1/shop/product', this.form).then(response => {
            // console.log(response)
            // first reset your form values
            for (let key in this.form ) {
              this.form[key] = ''
            }
            // then do this to reset your ValidationObserver
            this.$nextTick(() => this.$refs.createproduct.reset())
            this.$bvToast.toast('product created successfully.', {
              title: 'Success',
              variant: 'success',
              solid: true,
            })
            this.$refs.productCreate.hide()
          }).catch(error => {
            this.$refs.productCreate.setErrors(error.response.data.errors)
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
