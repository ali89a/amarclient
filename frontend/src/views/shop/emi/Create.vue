<template>
  <b-row>
    <b-col cols="12">
      <div class="card">
        <div class="card-header">
          <span class="card-title">EMI Information</span>
        </div>
        <div class="card-body">
          <validation-observer ref="createemi">
            <b-form>
              <b-row>
                <b-col md="6">
                  <b-form-group label="Product name">
                    <validation-provider
                      #default="{ errors }"
                      name="product_id"
                      rules="required"
                    >
                      <b-form-select
                        v-model="form.product_id"
                        :options="products"
                        value-field="id"
                        text-field="name"
                      >
                        <template #first>
                          <b-form-select-option
                            :value="null"
                            :selected="true"
                          >
                            -- Please select a product --
                          </b-form-select-option>
                        </template>
                      </b-form-select>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Customer name">
                    <select
                      v-model="form.customer_id"
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
                        v-for="customer in customers"
                        :key="customer.id"
                        :value="customer.id"
                      >
                        {{ customer.name }}
                      </option>
                    </select>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Total amount">
                    <validation-provider
                      #default="{ errors }"
                      name="total_amount"
                      rules="required"
                    >
                      <b-form-input
                        v-model="form.total_amount"
                        :state="errors.length > 0 ? false:null"
                        type="text"
                        placeholder="Total amount"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Total Installment">
                    <validation-provider
                      #default="{ errors }"
                      name="total_installment"
                      rules="required"
                    >
                      <b-form-input
                        v-model="form.total_installment"
                        :state="errors.length > 0 ? false:null"
                        type="text"
                        placeholder="Total Installment"
                        @input="setEndDate"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Start Date">
                    <validation-provider
                      #default="{ errors }"
                      name="start_data"
                      rules="required"
                    >
                      <b-form-datepicker
                        id="start_date"
                        v-model="form.start_date"
                        :state="errors.length > 0 ? false:null"
                        class="mb-1"
                        @input="setEndDate"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="End Date">
                    <validation-provider
                      #default="{ errors }"
                      name="end_data"
                      rules="required"
                    >
                      <b-form-datepicker
                        id="end_date"
                        v-model="form.end_date"
                        :state="errors.length > 0 ? false:null"
                        class="mb-1"
                        disabled
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Down Payment">
                    <validation-provider
                        #default="{ errors }"
                        name="down_payment"
                    >
                      <b-form-input
                          v-model="form.down_payment"
                          :state="errors.length > 0 ? false:null"
                          type="text"
                          placeholder="down payment"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
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
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BFormInput, BFormGroup, BForm, BRow, BCol, BButton,
} from 'bootstrap-vue'
import { required } from '@validations'
import axiosIns from '@/libs/axios'
import moment from 'moment'

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
  },
  data() {
    return {
      form: {
        product_id: '',
        customer_id: '',
        total_amount: '',
        total_installment: '',
        down_payment: '',
        start_date: '',
        end_date: '',
        description: '',
      },
      products: [],
      customers: [],
      required,
    }
  },
  mounted() {
    this.getProducts()
    this.getCustomerData()
  },
  methods: {
    getCustomerData() {
      axiosIns.get('api/v1/shop/customer').then(response => {
        // console.log(response.data)
        this.customers = response.data
      })
    },
    getProducts() {
      axiosIns.get('api/v1/shop/product').then(response => {
        this.products = response.data
      })
    },
    validationForm() {
      console.log(this.form.start_date)
      this.$refs.createemi.validate().then(success => {
        if (success) {
          axiosIns.post('api/v1/shop/emi', this.form).then(response => {
            console.log(response.data)
            // first reset your form values
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const key in this.form) {
              this.form[key] = ''
            }
            // then do this to reset your ValidationObserver
            this.$nextTick(() => this.$refs.createemi.reset())
            this.$bvToast.toast(response.data.message, {
              title: 'Success',
              variant: 'success',
              solid: true,
            })
          }).catch(error => {
            this.$refs.createemi.setErrors(error.response.data.errors)
          })
        }
      })
    },
    setEndDate() {
      // eslint-disable-next-line operator-assignment
      // alert(this.form.start_date)
      // console.log(this.form.start_date)
      // console.log(this.form.total_installment)
      const end_date = moment(this.form.start_date, 'YYYY-MM-DD').add(this.form.total_installment, 'months')
      // console.log(end_date)
      this.form.end_date = moment(end_date).format('YYYY-MM-DD')
    },
  },
}
</script>
