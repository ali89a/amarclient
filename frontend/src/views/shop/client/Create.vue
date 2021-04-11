<template>
  <b-row>
    <b-col cols="12">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Client Information</span>
        </div>
        <div class="card-body">
          <validation-observer ref="createCustomer">
            <b-form>
              <b-row>
                <b-col md="6">
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
                </b-col>
                <b-col md="6">
                  <b-form-group label="Company">
                    <validation-provider
                      #default="{ errors }"
                      name="company"
                      rules="required"
                    >
                      <b-form-input
                        v-model="form.name"
                        :state="errors.length > 0 ? false:null"
                        placeholder="Company"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Mobile 1">
                    <validation-provider
                      #default="{ errors }"
                      name="phone_number_1"
                    >
                      <b-form-input
                        v-model="form.phone_number_1"
                        :state="errors.length > 0 ? false:null"
                        type="text"
                        placeholder="Mobile 1"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Mobile 2">
                    <validation-provider
                        #default="{ errors }"
                        name="phone_number_2"
                    >
                      <b-form-input
                          v-model="form.phone_number_2"
                          :state="errors.length > 0 ? false:null"
                          type="text"
                          placeholder="Mobile 2"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Email">
                    <validation-provider
                      #default="{ errors }"
                      name="email"
                    >
                      <b-form-input
                        v-model="form.email"
                        :state="errors.length > 0 ? false:null"
                        type="text"
                        placeholder="Email"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Notes">
                    <validation-provider
                      #default="{ errors }"
                      name="notes"
                    >
                      <b-form-textarea
                        v-model="form.notes"
                        :state="errors.length > 0 ? false:null"
                        placeholder="Notes"
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
        name: '',
        company: '',
        phone_number_1: '',
        phone_number_2: '',
        email: '',
        notes: '',
        address: '',
        website: '',
        country_id: '',
        division_id: '',
        district_id: '',
        upazila_id: '',
      },
      required,
    }
  },
  methods: {
    validationForm() {
      this.$refs.createCustomer.validate().then(success => {
        if (success) {
          axiosIns.post('api/v1/shop/customer', this.form).then(response => {
            // console.log(response)
            // first reset your form values
            for (let key in this.form ) {
              this.form[key] = ''
            }
            // then do this to reset your ValidationObserver
            this.$nextTick(() => this.$refs.createCustomer.reset())
            this.$bvToast.toast('Customer created successfully.', {
              title: 'Success',
              variant: 'success',
              solid: true,
            })
          }).catch(error => {
            this.$refs.createCustomer.setErrors(error.response.data.errors)
          })
        }
      })
    },
  },
}
</script>
