<template>
  <section class="invoice-add-wrapper">
    <b-row class="invoice-add">

      <!-- Col: Left (Invoice Container) -->
      <b-col
        cols="12"
        xl="9"
        md="8"
      >
        <b-form @submit.prevent>
          <b-card
            no-body
            class="invoice-preview-card"
          >
            <!-- Header -->
            <b-card-body class="invoice-padding pb-0">

              <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">

                <!-- Header: Left Content -->
                <div>
                  <div class="logo-wrapper">
                    <logo />
                    <h3 class="text-primary invoice-logo">
                      {{ shop_info.user.name }}
                    </h3>
                  </div>
                  <b-card-text class="mb-25">
                    Office 149, 450 South Brand Brooklyn
                  </b-card-text>
                  <b-card-text class="mb-25">
                    San Diego County, CA 91905, USA
                  </b-card-text>
                  <b-card-text class="mb-0">
                    +1 (123) 456 7891, +44 (876) 543 2198
                  </b-card-text>
                </div>

                <!-- Header: Right Content -->
                <div class="invoice-number-date mt-md-0 mt-2">
                  <div class="d-flex align-items-center justify-content-md-end mb-1">
                    <h4 class="invoice-title">
                      Invoice
                    </h4>
                    <b-input-group class="input-group-merge invoice-edit-input-group disabled">
                      <b-input-group-prepend is-text>
                        <feather-icon icon="HashIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="invoice-data-id"
                        v-model="invoiceData.invoice_no"
                        disabled
                      />
                    </b-input-group>
                  </div>
                  <div class="d-flex align-items-center mb-1">
                    <span class="title">
                      Date:
                    </span>
                    <flat-pickr
                      v-model="invoiceData.date"
                      class="form-control invoice-edit-input"
                    />
                  </div>
                  <div class="d-flex align-items-center">
                    <span class="title">
                      Due Date:
                    </span>
                    <flat-pickr
                      v-model="invoiceData.next_payment"
                      class="form-control invoice-edit-input"
                    />
                  </div>
                </div>
              </div>
            </b-card-body>

            <!-- Spacer -->
            <hr class="invoice-spacing">

            <!-- Invoice Client & Payment Details -->
            <b-card-body
              class="invoice-padding pt-0"
            >
              <b-row class="invoice-spacing">

                <!-- Col: Invoice To -->
                <b-col
                  cols="12"
                  xl="6"
                  class="mb-lg-1"
                >
                  <h6 class="mb-2">
                    Invoice To:
                  </h6>

                  <!-- Select Client -->
                  <v-select
                    v-model="invoiceData.client"
                    dir="ltr"
                    :options="clients"
                    label="company"
                    input-id="invoice-data-client"
                    :clearable="false"
                    placeholder="Select client"
                  >
                    <template #list-header>
                      <li
                        v-b-toggle.sidebar-invoice-add-new-customer
                        class="add-new-client-header d-flex align-items-center my-50"
                      >
                        <feather-icon
                          icon="PlusIcon"
                          size="16"
                        />
                        <span class="align-middle ml-25">Add New Client</span>
                      </li>
                    </template>
                  </v-select>

                  <!-- Selected Client -->
                  <div
                    v-if="invoiceData.client"
                    class="mt-1"
                  >
                    <h6 class="mb-25">
                      {{ invoiceData.client.name }}
                    </h6>
                    <b-card-text class="mb-25">
                      {{ invoiceData.client.company }}
                    </b-card-text>
                    <b-card-text class="mb-25">
                      {{ invoiceData.client.address }}
                    </b-card-text>
                    <b-card-text class="mb-0">
                      {{ invoiceData.client.email }}
                    </b-card-text>
                  </div>
                </b-col>

                <!-- Col: Payment Details -->
                <b-col
                  xl="6"
                  cols="12"
                  class="mt-xl-0 mt-2 justify-content-end d-xl-flex d-block"
                >
                  <div>
                    <h6 class="mb-2">
                      Payment Details:
                    </h6>
                    <table>
                      <tbody>
                        <tr>
                          <td class="pr-1">
                            Total Due:
                          </td>
                          <td><span class="font-weight-bold">$12,110.55</span></td>
                        </tr>
                        <tr>
                          <td class="pr-1">
                            Bank name:
                          </td>
                          <td>American Bank</td>
                        </tr>
                        <tr>
                          <td class="pr-1">
                            Country:
                          </td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td class="pr-1">
                            IBAN:
                          </td>
                          <td>ETD95476213874685</td>
                        </tr>
                        <tr>
                          <td class="pr-1">
                            SWIFT code:
                          </td>
                          <td>BR91905</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-col>
              </b-row>
            </b-card-body>

            <!-- Items Section -->
            <b-card-body class="invoice-padding form-item-section">
              <div
                ref="form"
                class="repeater-form"
                :style="{height: trHeight}"
              >
                <b-row
                  v-for="(item, index) in invoiceData.items"
                  :key="index"
                  ref="row"
                  class="pb-2"
                >

                  <!-- Item Form -->
                  <!-- ? This will be in loop => So consider below markup for single item -->
                  <b-col cols="12">

                    <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                    <div class="d-none d-lg-flex">
                      <b-row class="flex-grow-1 px-1">
                        <!-- Single Item Form Headers -->
                        <b-col
                          cols="12"
                          lg="5"
                        >
                          Items
                        </b-col>
                      </b-row>
                      <div class="form-item-action-col" />
                    </div>

                    <!-- Form Input Fields OR content inside bordered area  -->
                    <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                    <div class="d-flex border rounded">
                      <b-row class="flex-grow-1 p-2">
                        <!-- Single Item Form Headers -->
                        <b-col
                          cols="12"
                          lg="5"
                        >
                          <label class="d-inline">Item</label>
                          <v-select
                            v-model="item.id"
                            dir="ltr"
                            :options="products"
                            label="name"
                            :clearable="false"
                            class="mb-2 item-selector-title"
                            placeholder="Select Item"
                            input-id="invoice-data-client"
                          >
                            <template #list-header>
                              <li
                                v-b-toggle.sidebar-add-product
                                class="add-new-client-header d-flex align-items-center my-50"
                              >
                                <feather-icon
                                  icon="PlusIcon"
                                  size="16"
                                />
                                <span class="align-middle ml-25">Add New Product</span>
                              </li>
                            </template>
                          </v-select>
                        </b-col>
                        <b-col
                          cols="12"
                          lg="3"
                        >
                          <label class="d-inline">Cost</label>
                          <b-form-input
                            v-model="item.cost"
                            type="number"
                            class="mb-2"
                          />
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          <label class="d-inline">Qty</label>
                          <b-form-input
                            v-model="item.qty"
                            type="number"
                            class="mb-2"
                          />
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          <label class="d-inline">Price</label>
                          <p class="mb-1">
                            ৳{{ item.cost * item.qty }}
                          </p>
                        </b-col>
                        <b-col
                          cols="12"
                          lg="5"
                        >
                          <label class="d-inline">Description</label>
                          <b-form-textarea
                            v-model="item.description"
                            class="mb-2 mb-lg-0"
                          />
                        </b-col>
                      </b-row>
                      <div class="d-flex flex-column justify-content-between border-left py-50 px-25">
                        <feather-icon
                          size="16"
                          icon="XIcon"
                          class="cursor-pointer"
                          @click="removeItem(index)"
                        />
                        <feather-icon
                          :id="`form-item-settings-icon-${index}`"
                          size="16"
                          icon="SettingsIcon"
                          class="cursor-pointer"
                        />

                        <!-- Setting Item Form -->

                      </div>
                    </div>
                  </b-col>
                </b-row>
              </div>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                size="sm"
                variant="primary"
                @click="addNewItemInItemForm"
              >
                Add Item
              </b-button>
            </b-card-body>

            <!-- Invoice Description: Total -->
            <b-card-body class="invoice-padding pb-0">
              <b-row>

                <!-- Col: Sales Persion -->
                <b-col
                  cols="12"
                  md="6"
                  class="mt-md-0 mt-3 d-flex align-items-center"
                  order="2"
                  order-md="1"
                />

                <!-- Col: Total -->
                <b-col
                  cols="12"
                  md="6"
                  class="mt-md-6 d-flex justify-content-end"
                  order="1"
                  order-md="2"
                >
                  <div class="invoice-total-wrapper">
                    <div class="invoice-total-item">
                      <p class="invoice-total-title">
                        Subtotal:
                      </p>
                      <p class="invoice-total-amount">
                        ৳1800
                      </p>
                    </div>
                    <div class="invoice-total-item">
                      <p class="invoice-total-title">
                        Discount:
                      </p>
                      <p class="invoice-total-amount">
                        ৳ 0
                      </p>
                    </div>
                    <div class="invoice-total-item">
                      <p class="invoice-total-title">
                        Tax:
                      </p>
                      <p class="invoice-total-amount">
                        0%
                      </p>
                    </div>
                    <hr class="my-50">
                    <div class="invoice-total-item">
                      <p class="invoice-total-title">
                        Total:
                      </p>
                      <p class="invoice-total-amount">
                        ৳ 1690
                      </p>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-card-body>

            <!-- Spacer -->
            <hr class="invoice-spacing">

            <!-- Note -->
            <b-card-body class="invoice-padding pt-0">
              <span class="font-weight-bold">Note: </span>
              <b-form-textarea v-model="invoiceData.notes" />
            </b-card-body>
          </b-card>
        </b-form>
      </b-col>

      <!--       Right Col: Card -->
      <b-col
        cols="12"
        md="4"
        xl="3"
        class="invoice-actions mt-md-0 mt-2"
      >
        <!-- Action Buttons -->
        <b-card>
          <!-- Button: Add Payment -->
          <b-button
            v-b-toggle.sidebar-invoice-add-payment
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
          >Add Payment</b-button>
          <!-- Button: Save -->
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            block
            @click.prevent="submitInvoice"
          >
            Save
          </b-button>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="danger"
            block
            @click.prevent="$router.push({name: 'shop.sale'})"
          >
            Cancel
          </b-button>
        </b-card>
      </b-col>
    </b-row>
    <invoice-sidebar-add-payment />
    <sidebar-add-product />
    <b-sidebar
      id="sidebar-invoice-add-new-customer"
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
            Add Client
          </h5>

          <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="hide"
          />

        </div>

        <!-- Body -->
        <validation-observer ref="createCustomer">
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
            <b-form-group label="Company">
              <validation-provider
                #default="{ errors }"
                name="company"
                rules="required"
              >
                <b-form-input
                  v-model="form.company"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Company"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Email">
              <validation-provider
                #default="{ errors }"
                name="email"
                rules="required"
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
            <!-- Form Actions -->
            <div class="d-flex mt-2">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mr-2"
                type="submit"
                @click.prevent="clientCreate"
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
  </section>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import Logo from '@core/layouts/components/Logo.vue'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BCard, BCardBody, BButton, BCardText, BForm, BFormGroup, BFormInput, BInputGroup, BInputGroupPrepend, BFormTextarea, BFormCheckbox, VBToggle,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import axiosIns from '@/libs/axios'
// import invoiceStoreModule from '../invoiceStoreModule'
import InvoiceSidebarAddPayment from '../invoice/InvoiceSidebarAddPayment.vue'
import SidebarAddProduct from '../product/sidebar-add-product.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BButton,
    BCardText,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BFormTextarea,
    flatPickr,
    vSelect,
    Logo,
    ValidationProvider,
    ValidationObserver,
    InvoiceSidebarAddPayment,
    SidebarAddProduct,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,

  },
  mixins: [heightTransition],
  data() {
    return {
      shop_info: {},
      invoiceData: {
        invoice_no: '',
        date: new Date(),
        next_payment: '',
        client: {},
        items: [{
          id: '',
          cost: '',
          qty: '',
          description: '',
        }],
        notes: '',
      },
      form: {
        name: '',
        company: '',
        email: '',
      },
      clients: [],
      products: [],
      itemPrice: '',
    }
  },
  watch: {
    'invoiceData.items.cost': 'itemChange',
  },
  mounted() {
    this.getShopInfo()
    this.getAllClients()
    this.getproductData()
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    getShopInfo() {
      axiosIns.get('api/v1/shop/shop-info').then(response => {
        console.log(response.data)
        this.shop_info = response.data
      })
    },
    getAllClients() {
      axiosIns.get('api/v1/shop/client').then(response => {
        console.log(response.data)
        this.clients = response.data
      })
    },
    getproductData() {
      axiosIns.get('api/v1/shop/product').then(response => {
        // console.log(response.data)
        this.products = response.data
      })
    },
    clientCreate() {
      this.$refs.createCustomer.validate().then(success => {
        if (success) {
          axiosIns.post('api/v1/shop/client', this.form).then(response => {
            console.log(response)
            // first reset your form values
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const key in this.form) {
              this.form[key] = ''
            }
            // then do this to reset your ValidationObserver
            this.$nextTick(() => this.$refs.createCustomer.reset())
            this.$bvToast.toast(response.data.message, {
              title: 'Success',
              variant: 'success',
              solid: true,
            })
            this.getAllClients()
            this.$refs.createClientSidebar.hide()
          }).catch(error => {
            this.$refs.createCustomer.setErrors(error.response.data.errors)
          })
        }
      })
    },
    addNewItemInItemForm() {
      this.$refs.form.style.overflow = 'hidden'
      this.invoiceData.items.push({
        id: '',
        cost: '',
        qty: '',
        description: '',
      })
      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
        setTimeout(() => {
          this.$refs.form.style.overflow = null
        }, 350)
      })
    },
    submitInvoice() {
      console.log(this.invoiceData)
    },
    removeItem(index) {
      this.invoiceData.items.splice(index, 1)
      // this.invoiceData.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
  setup() {
    const itemsOptions = [
      {
        itemTitle: 'App Design',
        cost: 24,
        qty: 1,
        description: 'Designed UI kit & app pages.',
      },
      {
        itemTitle: 'App Customization',
        cost: 26,
        qty: 1,
        description: 'Customization & Bug Fixes.',
      },
      {
        itemTitle: 'ABC Template',
        cost: 28,
        qty: 1,
        description: 'Bootstrap 4 admin template.',
      },
      {
        itemTitle: 'App Development',
        cost: 32,
        qty: 1,
        description: 'Native App Development.',
      },
    ]

    const paymentMethods = [
      'Bank Account',
      'PayPal',
      'UPI Transfer',
    ]

    return {
      paymentMethods,
      itemsOptions,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
.invoice-add-wrapper {
  .add-new-client-header {
    padding: $options-padding-y $options-padding-x;
    color: $success;

    &:hover {
      background-color: rgba($success, 0.12);
    }
  }
}
</style>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";
@import '~@core/scss/base/components/variables-dark';

.form-item-section {
  background-color:$product-details-bg;
}

.form-item-action-col {
  width: 27px;
}

.repeater-form {
  // overflow: hidden;
  transition: .35s height;
}

.v-select {
  &.item-selector-title,
  &.payment-selector {
    background-color: #fff;

    .dark-layout & {
      background-color: unset;
    }
  }
}

.dark-layout {
  .form-item-section {
    background-color: $theme-dark-body-bg;

    .row .border {
      background-color: $theme-dark-card-bg;
    }

  }
}
</style>
