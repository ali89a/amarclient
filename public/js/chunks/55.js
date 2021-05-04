(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[55],{

/***/ "./frontend/src/libs/axios.js":
/*!************************************!*\
  !*** ./frontend/src/libs/axios.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./frontend/node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./frontend/node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
 // axios


var axiosIns = axios__WEBPACK_IMPORTED_MODULE_1___default.a.create({
  // You can add your headers here
  // ================================
  baseURL: 'http://127.0.0.1:8000',
  // baseURL: 'http://cashbaksho.com/',
  timeout: 5000,
  headers: {
    Accept: 'application/json'
  } //Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`

});
vue__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.$http = axiosIns;
/* harmony default export */ __webpack_exports__["default"] = (axiosIns);

/***/ }),

/***/ "./frontend/src/views/Home.vue":
/*!*************************************!*\
  !*** ./frontend/src/views/Home.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Home_vue_vue_type_template_id_a19270ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=a19270ec& */ "./frontend/src/views/Home.vue?vue&type=template&id=a19270ec&");
/* harmony import */ var _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js& */ "./frontend/src/views/Home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Home_vue_vue_type_template_id_a19270ec___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Home_vue_vue_type_template_id_a19270ec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "frontend/src/views/Home.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./frontend/src/views/Home.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./frontend/src/views/Home.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/Home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./frontend/src/views/Home.vue?vue&type=template&id=a19270ec&":
/*!********************************************************************!*\
  !*** ./frontend/src/views/Home.vue?vue&type=template&id=a19270ec& ***!
  \********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_a19270ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=template&id=a19270ec& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/Home.vue?vue&type=template&id=a19270ec&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_a19270ec___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_a19270ec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/Home.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./frontend/src/views/Home.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap-vue */ "./frontend/node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var _libs_axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/libs/axios */ "./frontend/src/libs/axios.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    BCard: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BCard"],
    BCardText: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BCardText"]
  },
  data: function data() {
    return {
      statistic: '',
      transactions: []
    };
  },
  mounted: function mounted() {
    this.getStatistic();
    this.getTransactionReport();
  },
  methods: {
    getStatistic: function getStatistic() {
      var _this = this;

      _libs_axios__WEBPACK_IMPORTED_MODULE_1__["default"].get('api/v1/shop/report').then(function (response) {
        // console.log(response.data)
        _this.statistic = response.data.data;
      });
    },
    getTransactionReport: function getTransactionReport() {
      var _this2 = this;

      _libs_axios__WEBPACK_IMPORTED_MODULE_1__["default"].get('api/v1/shop/report/transaction').then(function (response) {
        // console.log(response.data.transactions)
        _this2.transactions = response.data.transactions;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/Home.vue?vue&type=template&id=a19270ec&":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./frontend/src/views/Home.vue?vue&type=template&id=a19270ec& ***!
  \**************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "section",
    { attrs: { id: "dashboard-ecommerce" } },
    [
      _c(
        "b-row",
        { staticClass: "match-height" },
        [
          _c(
            "b-col",
            { attrs: { xl: "12", md: "12" } },
            [
              _c(
                "b-card",
                { staticClass: "card-statistics", attrs: { "no-body": "" } },
                [
                  _c(
                    "b-card-header",
                    [_c("b-card-title", [_vm._v("Statistics")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-card-body",
                    { staticClass: "statistics-body" },
                    [
                      _c(
                        "b-row",
                        [
                          _c(
                            "b-col",
                            { attrs: { xl: "2", sm: "6" } },
                            [
                              _c(
                                "b-media",
                                { attrs: { "no-body": "" } },
                                [
                                  _c(
                                    "b-media-body",
                                    { staticClass: "my-auto" },
                                    [
                                      _c(
                                        "h4",
                                        {
                                          staticClass: "font-weight-bolder mb-0"
                                        },
                                        [
                                          _vm._v(
                                            "\n                    " +
                                              _vm._s(
                                                _vm.statistic.total_sales
                                              ) +
                                              "\n                  "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "b-card-text",
                                        { staticClass: "font-small-3 mb-0" },
                                        [
                                          _vm._v(
                                            "\n                    Sales\n                  "
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            { attrs: { xl: "3", sm: "6" } },
                            [
                              _c(
                                "b-media",
                                { attrs: { "no-body": "" } },
                                [
                                  _c(
                                    "b-media-body",
                                    { staticClass: "my-auto" },
                                    [
                                      _c(
                                        "h4",
                                        {
                                          staticClass: "font-weight-bolder mb-0"
                                        },
                                        [
                                          _vm._v(
                                            "\n                    " +
                                              _vm._s(
                                                _vm.statistic.total_purchases
                                              ) +
                                              "\n                  "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "b-card-text",
                                        { staticClass: "font-small-3 mb-0" },
                                        [
                                          _vm._v(
                                            "\n                    Purchases\n                  "
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            { attrs: { xl: "2", sm: "6" } },
                            [
                              _c(
                                "b-media",
                                { attrs: { "no-body": "" } },
                                [
                                  _c(
                                    "b-media-body",
                                    { staticClass: "my-auto" },
                                    [
                                      _c(
                                        "h4",
                                        {
                                          staticClass: "font-weight-bolder mb-0"
                                        },
                                        [
                                          _vm._v(
                                            "\n                    " +
                                              _vm._s(
                                                _vm.statistic.total_customers
                                              ) +
                                              "\n                  "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "b-card-text",
                                        { staticClass: "font-small-3 mb-0" },
                                        [
                                          _vm._v(
                                            "\n                    Customers\n                  "
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            { attrs: { xl: "2", sm: "6" } },
                            [
                              _c(
                                "b-media",
                                { attrs: { "no-body": "" } },
                                [
                                  _c(
                                    "b-media-body",
                                    { staticClass: "my-auto" },
                                    [
                                      _c(
                                        "h4",
                                        {
                                          staticClass: "font-weight-bolder mb-0"
                                        },
                                        [
                                          _vm._v(
                                            "\n                    " +
                                              _vm._s(
                                                _vm.statistic.total_suppliers
                                              ) +
                                              "\n                  "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "b-card-text",
                                        { staticClass: "font-small-3 mb-0" },
                                        [
                                          _vm._v(
                                            "\n                    Suppliers\n                  "
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            { attrs: { xl: "2", sm: "6" } },
                            [
                              _c(
                                "b-media",
                                { attrs: { "no-body": "" } },
                                [
                                  _c(
                                    "b-media-body",
                                    { staticClass: "my-auto" },
                                    [
                                      _c(
                                        "h4",
                                        {
                                          staticClass: "font-weight-bolder mb-0"
                                        },
                                        [
                                          _vm._v(
                                            "\n                    " +
                                              _vm._s(
                                                _vm.statistic.total_products
                                              ) +
                                              "\n                  "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "b-card-text",
                                        { staticClass: "font-small-3 mb-0" },
                                        [
                                          _vm._v(
                                            "\n                    Products\n                  "
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { attrs: { lg: "4", md: "6" } },
            [
              _vm.transactions.length > 0
                ? _c(
                    "b-card",
                    {
                      staticClass: "card-transaction",
                      attrs: { "no-body": "" }
                    },
                    [
                      _c(
                        "b-card-header",
                        [
                          _c("b-card-title", [_vm._v("Transactions")]),
                          _vm._v(" "),
                          _c("b-dropdown", {
                            staticClass: "chart-dropdown",
                            attrs: {
                              variant: "link",
                              "no-caret": "",
                              "toggle-class": "p-0",
                              right: ""
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "button-content",
                                  fn: function() {
                                    return [
                                      _c("feather-icon", {
                                        staticClass: "text-body cursor-pointer",
                                        attrs: {
                                          icon: "MoreVerticalIcon",
                                          size: "18"
                                        }
                                      })
                                    ]
                                  },
                                  proxy: true
                                }
                              ],
                              null,
                              false,
                              592634808
                            )
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "b-card-body",
                        _vm._l(_vm.transactions, function(transaction) {
                          return _c(
                            "div",
                            {
                              key: transaction.id,
                              staticClass: "transaction-item"
                            },
                            [
                              _c(
                                "b-media",
                                { attrs: { "no-body": "" } },
                                [
                                  _c("b-media-body", [
                                    _c(
                                      "h6",
                                      { staticClass: "transaction-title" },
                                      [
                                        _vm._v(
                                          "\n                  " +
                                            _vm._s(
                                              transaction.transactionable.name
                                            ) +
                                            "\n                "
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("small", [
                                      _vm._v(_vm._s(transaction.user_type))
                                    ])
                                  ])
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "font-weight-bolder",
                                  class: transaction.given
                                    ? "text-danger"
                                    : "text-success"
                                },
                                [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(transaction.given ? "-" : "+") +
                                      _vm._s(
                                        transaction.given
                                          ? transaction.given
                                          : transaction.taken
                                      ) +
                                      "\n            "
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        }),
                        0
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);