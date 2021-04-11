<template>
  <section>
    <b-row>
      <b-col cols="12">
        <div class="card">
          <div class="card-header">
            <span class="card-title">purchase Information</span>
          </div>
          <div class="card-body">
            <validation-observer ref="createpurchase">
              <b-form>
                <b-row>
                  <b-col md="6">
                    <b-form-group label="Supplier name">
                      <select
                        v-model="form.supplier_id"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                        >
                          Choose one
                        </option>
                        <option
                          v-for="supplier in suppliers"
                          :value="supplier.id"
                        >
                          {{ supplier.name }}
                        </option>
                      </select>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Product name">
                      <validation-provider
                          #default="{ errors }"
                          name="item_name"
                          rules="required"
                      >
                        <b-form-input
                            v-model="form.item_name"
                            :state="errors.length > 0 ? false:null"
                            type="text"
                            placeholder="Product name"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Amount">
                      <validation-provider
                        #default="{ errors }"
                        name="amount"
                        rules="required"
                      >
                        <b-form-input
                          v-model="form.amount"
                          :state="errors.length > 0 ? false:null"
                          type="text"
                          placeholder="amount"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <label for="example-datepicker">Choose a date</label>
                    <b-form-datepicker
                      id="example-datepicker"
                      v-model="form.date"
                      class="mb-1"
                    />
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Description">
                      <validation-provider
                        #default="{ errors }"
                        name="description"
                      >
                        <b-form-textarea
                          v-model="form.description"
                          :state="errors.length > 0 ? false:null"
                          placeholder="Description"
                          rows="3"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <b-button
                      variant="primary"
                      type="submit"
                      @click.prevent="validationForm"
                    >
                      Submit
                    </b-button>
                  </b-col>
                </b-row>
              </b-form>
            </validation-observer>
          </div>
        </div>
        <!-- form -->
      </b-col>
    </b-row>
  </section>
</template>

<script>

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BFormInput, BFormGroup, BForm, BRow, BCol, BButton, BFormDatepicker,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { required } from '@validations'
import axiosIns from '@/libs/axios'
import 'vue-select/src/scss/vue-select.scss'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BFormInput,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormDatepicker,
    vSelect,
  },
  data() {
    return {
      form: {
        item_name: '',
        supplier_id: '',
        amount: '',
        date: '',
        description: '',
      },
      suppliers: [],
      // products: [],
      required,
    }
  },
  mounted() {
    this.getsupplierData()
    // this.getProducts()
  },
  methods: {
    getsupplierData() {
      axiosIns.get('api/v1/shop/supplier').then(response => {
        // console.log(response.data)
        this.suppliers = response.data
      })
    },
    getProducts() {
      axiosIns.get('api/v1/shop/product').then(response => {
        // console.log(response.data)
        this.products = response.data
      })
    },
    validationForm() {
      this.$refs.createpurchase.validate().then(success => {
        if (success) {
          axiosIns.post('api/v1/shop/purchase', this.form).then(response => {
            console.log(response)
            // first reset your form values
            for (const key in this.form) {
              this.form[key] = ''
            }
            // then do this to reset your ValidationObserver
            this.$nextTick(() => this.$refs.createpurchase.reset())
            this.$bvToast.toast(response.data.message, {
              title: 'Success',
              variant: 'success',
              solid: true,
            })
          })
        }
      }).catch(error => {
        this.$refs.createpurchase.setErrors(error.response.data.errors)
      })
    },
  },
}
</script>
