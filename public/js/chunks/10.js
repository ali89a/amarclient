(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./frontend/src/@core/auth/jwt/jwtDefaultConfig.js":
/*!*********************************************************!*\
  !*** ./frontend/src/@core/auth/jwt/jwtDefaultConfig.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  // Endpoints
  loginEndpoint: '/api/v1/shop/login',
  registerEndpoint: '/api/v1/shop/register',
  refreshEndpoint: '/api/v1/shop/refresh-token',
  logoutEndpoint: '/api/v1/shop/logout',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',
  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'userAccessToken',
  storageRefreshTokenKeyName: 'userRefreshToken'
});

/***/ }),

/***/ "./frontend/src/@core/auth/jwt/jwtService.js":
/*!***************************************************!*\
  !*** ./frontend/src/@core/auth/jwt/jwtService.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return JwtService; });
/* harmony import */ var _jwtDefaultConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jwtDefaultConfig */ "./frontend/src/@core/auth/jwt/jwtDefaultConfig.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var JwtService = /*#__PURE__*/function () {
  // Will be used by this service for making API calls
  // jwtConfig <= Will be used by this service
  // For Refreshing Token
  // For Refreshing Token
  function JwtService(axiosIns, jwtOverrideConfig) {
    var _this = this;

    _classCallCheck(this, JwtService);

    _defineProperty(this, "axiosIns", null);

    _defineProperty(this, "jwtConfig", _objectSpread({}, _jwtDefaultConfig__WEBPACK_IMPORTED_MODULE_0__["default"]));

    _defineProperty(this, "isAlreadyFetchingAccessToken", false);

    _defineProperty(this, "subscribers", []);

    this.axiosIns = axiosIns;
    this.jwtConfig = _objectSpread(_objectSpread({}, this.jwtConfig), jwtOverrideConfig); // Request Interceptor

    this.axiosIns.interceptors.request.use(function (config) {
      // Get token from localStorage
      var accessToken = _this.getToken(); // If token is present add it to request's Authorization Header


      if (accessToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = "".concat(_this.jwtConfig.tokenType, " ").concat(accessToken);
      }

      return config;
    }, function (error) {
      return Promise.reject(error);
    }); // Add request/response interceptor

    this.axiosIns.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      // const { config, response: { status } } = error
      var config = error.config,
          response = error.response;
      var originalRequest = config; // if (status === 401) {

      if (response && response.status === 401) {
        if (!_this.isAlreadyFetchingAccessToken) {
          _this.isAlreadyFetchingAccessToken = true;

          _this.refreshToken().then(function (r) {
            _this.isAlreadyFetchingAccessToken = false; // Update accessToken in localStorage

            _this.setToken(r.data.accessToken);

            _this.setRefreshToken(r.data.refreshToken);

            _this.onAccessTokenFetched(r.data.accessToken);
          });
        }

        var retryOriginalRequest = new Promise(function (resolve) {
          _this.addSubscriber(function (accessToken) {
            // Make sure to assign accessToken according to your response.
            // Check: https://pixinvent.ticksy.com/ticket/2413870
            // Change Authorization header
            originalRequest.headers.Authorization = "".concat(_this.jwtConfig.tokenType, " ").concat(accessToken);
            resolve(_this.axiosIns(originalRequest));
          });
        });
        return retryOriginalRequest;
      }

      return Promise.reject(error);
    });
  }

  _createClass(JwtService, [{
    key: "onAccessTokenFetched",
    value: function onAccessTokenFetched(accessToken) {
      this.subscribers = this.subscribers.filter(function (callback) {
        return callback(accessToken);
      });
    }
  }, {
    key: "addSubscriber",
    value: function addSubscriber(callback) {
      this.subscribers.push(callback);
    }
  }, {
    key: "getToken",
    value: function getToken() {
      return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
    }
  }, {
    key: "getRefreshToken",
    value: function getRefreshToken() {
      return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
    }
  }, {
    key: "setToken",
    value: function setToken(value) {
      localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
    }
  }, {
    key: "setRefreshToken",
    value: function setRefreshToken(value) {
      localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
    }
  }, {
    key: "login",
    value: function login() {
      var _this$axiosIns;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_this$axiosIns = this.axiosIns).post.apply(_this$axiosIns, [this.jwtConfig.loginEndpoint].concat(args));
    }
  }, {
    key: "register",
    value: function register() {
      var _this$axiosIns2;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return (_this$axiosIns2 = this.axiosIns).post.apply(_this$axiosIns2, [this.jwtConfig.registerEndpoint].concat(args));
    }
  }, {
    key: "refreshToken",
    value: function refreshToken() {
      return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
        refreshToken: this.getRefreshToken()
      });
    }
  }]);

  return JwtService;
}();



/***/ }),

/***/ "./frontend/src/@core/auth/jwt/useJwt.js":
/*!***********************************************!*\
  !*** ./frontend/src/@core/auth/jwt/useJwt.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useJwt; });
/* harmony import */ var _jwtService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jwtService */ "./frontend/src/@core/auth/jwt/jwtService.js");

function useJwt(axiosIns, jwtOverrideConfig) {
  var jwt = new _jwtService__WEBPACK_IMPORTED_MODULE_0__["default"](axiosIns, jwtOverrideConfig);
  return {
    jwt: jwt
  };
}

/***/ }),

/***/ "./frontend/src/@core/layouts/components/Logo.vue":
/*!********************************************************!*\
  !*** ./frontend/src/@core/layouts/components/Logo.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Logo_vue_vue_type_template_id_556c28d4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logo.vue?vue&type=template&id=556c28d4& */ "./frontend/src/@core/layouts/components/Logo.vue?vue&type=template&id=556c28d4&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

var script = {}


/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  script,
  _Logo_vue_vue_type_template_id_556c28d4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Logo_vue_vue_type_template_id_556c28d4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "frontend/src/@core/layouts/components/Logo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./frontend/src/@core/layouts/components/Logo.vue?vue&type=template&id=556c28d4&":
/*!***************************************************************************************!*\
  !*** ./frontend/src/@core/layouts/components/Logo.vue?vue&type=template&id=556c28d4& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Logo_vue_vue_type_template_id_556c28d4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Logo.vue?vue&type=template&id=556c28d4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/@core/layouts/components/Logo.vue?vue&type=template&id=556c28d4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Logo_vue_vue_type_template_id_556c28d4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Logo_vue_vue_type_template_id_556c28d4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./frontend/src/@core/mixins/ui/forms.js":
/*!***********************************************!*\
  !*** ./frontend/src/@core/mixins/ui/forms.js ***!
  \***********************************************/
/*! exports provided: togglePasswordVisibility, _ */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "togglePasswordVisibility", function() { return togglePasswordVisibility; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_", function() { return _; });
// We haven't added icon's computed property because it makes this mixin coupled with UI
var togglePasswordVisibility = {
  data: function data() {
    return {
      passwordFieldType: 'password'
    };
  },
  methods: {
    togglePasswordVisibility: function togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }
  }
};
var _ = null;

/***/ }),

/***/ "./frontend/src/@core/utils/validations/validations.js":
/*!*************************************************************!*\
  !*** ./frontend/src/@core/utils/validations/validations.js ***!
  \*************************************************************/
/*! exports provided: required, email, min, confirmed, regex, between, alpha, integer, digits, alphaDash, alphaNum, length, positive, credit, password, url */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "required", function() { return required; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "email", function() { return email; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "confirmed", function() { return confirmed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regex", function() { return regex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "between", function() { return between; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alpha", function() { return alpha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "integer", function() { return integer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "digits", function() { return digits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alphaDash", function() { return alphaDash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alphaNum", function() { return alphaNum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "positive", function() { return positive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "credit", function() { return credit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "password", function() { return password; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "url", function() { return url; });
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vee-validate */ "./frontend/node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vee-validate/dist/rules */ "./frontend/node_modules/vee-validate/dist/rules.js");
/* harmony import */ var vee_validate_dist_locale_ar_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vee-validate/dist/locale/ar.json */ "./frontend/node_modules/vee-validate/dist/locale/ar.json");
var vee_validate_dist_locale_ar_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! vee-validate/dist/locale/ar.json */ "./frontend/node_modules/vee-validate/dist/locale/ar.json", 1);
/* harmony import */ var vee_validate_dist_locale_en_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vee-validate/dist/locale/en.json */ "./frontend/node_modules/vee-validate/dist/locale/en.json");
var vee_validate_dist_locale_en_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! vee-validate/dist/locale/en.json */ "./frontend/node_modules/vee-validate/dist/locale/en.json", 1);
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validators */ "./frontend/src/@core/utils/validations/validators.js");



 // eslint-disable-next-line object-curly-newline

 // ////////////////////////////////////////////////////////
// General
// ////////////////////////////////////////////////////////

var required = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('required', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__["required"]);
var email = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('email', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__["email"]);
var min = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('min', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__["min"]);
var confirmed = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('confirmed', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__["confirmed"]);
var regex = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('regex', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__["regex"]);
var between = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('between', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__["between"]);
var alpha = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('alpha', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__["alpha"]);
var integer = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('integer', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__["integer"]);
var digits = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('digits', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__["digits"]);
var alphaDash = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('alpha-dash', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__["alpha_dash"]);
var alphaNum = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('alpha-num', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__["alpha_num"]);
var length = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('length', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__["length"]);
var positive = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('positive', {
  validate: _validators__WEBPACK_IMPORTED_MODULE_4__["validatorPositive"],
  message: 'Please enter positive number!'
});
var credit = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('credit-card', {
  validate: _validators__WEBPACK_IMPORTED_MODULE_4__["validatorCreditCard"],
  message: 'It is not valid credit card!'
});
var password = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('password', {
  validate: _validators__WEBPACK_IMPORTED_MODULE_4__["validatorPassword"],
  message: 'Your {_field_} must contain at least one uppercase, one lowercase, one special character and one digit'
});
var url = Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["extend"])('url', {
  validate: _validators__WEBPACK_IMPORTED_MODULE_4__["validatorUrlValidator"],
  message: 'URL is invalid'
}); // Install English and Arabic localizations.

Object(vee_validate__WEBPACK_IMPORTED_MODULE_0__["localize"])({
  en: {
    messages: vee_validate_dist_locale_en_json__WEBPACK_IMPORTED_MODULE_3__.messages,
    names: {
      email: 'Email',
      password: 'Password'
    },
    fields: {
      password: {
        min: '{_field_} is too short, you want to get hacked?'
      }
    }
  },
  ar: {
    messages: vee_validate_dist_locale_ar_json__WEBPACK_IMPORTED_MODULE_2__.messages,
    names: {
      email: '???????????? ????????????????????',
      password: '???????? ????????'
    },
    fields: {
      password: {
        min: '???????? ???????? ?????????? ???????? ???????? ??????????????'
      }
    }
  }
}); // ////////////////////////////////////////////////////////
// NOTE:
// Quasar validation for reference only
// Remove this note once development is finished and make sure to
// to convert all of them in veevalidate version
// ////////////////////////////////////////////////////////
// export const required = (val) => {
//   return (val && val.length > 0) || '*Field is required'
// }
// export const required_obj = (obj) => {
//   if (obj === null || obj === undefined) return '*Field is required'
//   return (Object.entries(obj).length > 0 && obj.constructor === Object) || '*Field is required'
// }
// export const no_blank_spaces_arr = (arr) => {
//   return arr.every(val => (val.trim() && val.trim().length > 0)) || 'Blank Spaces are not allowed'
// }
// export const url = val => {
//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true
//   // Used
//   // https://stackoverflow.com/questions/4314741/url-regex-validation
//   // Other
//   // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
//   // https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php
//   // https://www.geeksforgeeks.org/how-to-validate-url-using-regular-expression-in-javascript/
//   /* eslint-disable no-useless-escape */
//   const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
//   /* eslint-enable no-useless-escape */
//   return re.test(val) || 'URL is invalid'
// }
// export const date = val => {
//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true
//   // https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns.js
//   return /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(val) || 'Date is invalid'
// }
// export const max = (val, max) => {
//   // If blank return
//   if (val === undefined || val === null) return true
//   return val.length <= max || `More than ${max} characters are not allowed`
// }
// export const max_arr = (val, max) => {
//   return val.length <= max || `More than ${max} values are not allowed`
// }
// export const min = (val, min) => {
//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true
//   return val.length >= min || `Minimum ${min} characters are required`
// }
// export const num_range = (val, min, max) => {
//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true
//   const msg = 'Value is invalid'
//   if (min === null) return val <= max || msg
//   else if (max === null) return val >= min || msg
//   else return (val >= min && val <= max) || msg
// }

/***/ }),

/***/ "./frontend/src/@core/utils/validations/validators.js":
/*!************************************************************!*\
  !*** ./frontend/src/@core/utils/validations/validators.js ***!
  \************************************************************/
/*! exports provided: validatorPositive, validatorPassword, validatorCreditCard, validatorUrlValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validatorPositive", function() { return validatorPositive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validatorPassword", function() { return validatorPassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validatorCreditCard", function() { return validatorCreditCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validatorUrlValidator", function() { return validatorUrlValidator; });
var validatorPositive = function validatorPositive(value) {
  if (value >= 0) {
    return true;
  }

  return false;
};
var validatorPassword = function validatorPassword(password) {
  /* eslint-disable no-useless-escape */
  var regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
  /* eslint-enable no-useless-escape */

  var validPassword = regExp.test(password);
  return validPassword;
};
var validatorCreditCard = function validatorCreditCard(creditnum) {
  /* eslint-disable no-useless-escape */
  var cRegExp = /^(?:3[47][0-9]{13})$/;
  /* eslint-enable no-useless-escape */

  var validCreditCard = cRegExp.test(creditnum);
  return validCreditCard;
};
var validatorUrlValidator = function validatorUrlValidator(val) {
  if (val === undefined || val === null || val.length === 0) {
    return true;
  }
  /* eslint-disable no-useless-escape */


  var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  /* eslint-enable no-useless-escape */

  return re.test(val);
};

/***/ }),

/***/ "./frontend/src/assets/images/pages/login-v2-dark.svg":
/*!************************************************************!*\
  !*** ./frontend/src/assets/images/pages/login-v2-dark.svg ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/images/_/_/_/_/amarclient/frontend/src/assets/images/pages/login-v2-dark.svg";

/***/ }),

/***/ "./frontend/src/assets/images/pages/login-v2.svg":
/*!*******************************************************!*\
  !*** ./frontend/src/assets/images/pages/login-v2.svg ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/images/_/_/_/_/amarclient/frontend/src/assets/images/pages/login-v2.svg";

/***/ }),

/***/ "./frontend/src/auth/jwt/useJwt.js":
/*!*****************************************!*\
  !*** ./frontend/src/auth/jwt/useJwt.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_auth_jwt_useJwt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/auth/jwt/useJwt */ "./frontend/src/@core/auth/jwt/useJwt.js");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @axios */ "./frontend/src/libs/axios.js");



var _useJwt = Object(_core_auth_jwt_useJwt__WEBPACK_IMPORTED_MODULE_0__["default"])(_axios__WEBPACK_IMPORTED_MODULE_1__["default"], {}),
    jwt = _useJwt.jwt;

/* harmony default export */ __webpack_exports__["default"] = (jwt);

/***/ }),

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
  // baseURL: 'https://amarclient.com/',
  timeout: 90000,
  headers: {
    Accept: 'application/json'
  }
});
vue__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.$http = axiosIns;
/* harmony default export */ __webpack_exports__["default"] = (axiosIns);

/***/ }),

/***/ "./frontend/src/views/Register.vue":
/*!*****************************************!*\
  !*** ./frontend/src/views/Register.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Register_vue_vue_type_template_id_a2590464___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Register.vue?vue&type=template&id=a2590464& */ "./frontend/src/views/Register.vue?vue&type=template&id=a2590464&");
/* harmony import */ var _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Register.vue?vue&type=script&lang=js& */ "./frontend/src/views/Register.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Register_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Register.vue?vue&type=style&index=0&lang=scss& */ "./frontend/src/views/Register.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Register_vue_vue_type_template_id_a2590464___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Register_vue_vue_type_template_id_a2590464___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "frontend/src/views/Register.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./frontend/src/views/Register.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./frontend/src/views/Register.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Register.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/Register.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./frontend/src/views/Register.vue?vue&type=style&index=0&lang=scss&":
/*!***************************************************************************!*\
  !*** ./frontend/src/views/Register.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Register.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/Register.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./frontend/src/views/Register.vue?vue&type=template&id=a2590464&":
/*!************************************************************************!*\
  !*** ./frontend/src/views/Register.vue?vue&type=template&id=a2590464& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_a2590464___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Register.vue?vue&type=template&id=a2590464& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/Register.vue?vue&type=template&id=a2590464&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_a2590464___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_a2590464___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/Register.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./frontend/src/views/Register.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vee-validate */ "./frontend/node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var _core_layouts_components_Logo_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/layouts/components/Logo.vue */ "./frontend/src/@core/layouts/components/Logo.vue");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap-vue */ "./frontend/node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @validations */ "./frontend/src/@core/utils/validations/validations.js");
/* harmony import */ var _core_mixins_ui_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/mixins/ui/forms */ "./frontend/src/@core/mixins/ui/forms.js");
/* harmony import */ var _store_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/store/index */ "./frontend/src/store/index.js");
/* harmony import */ var _libs_axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/libs/axios */ "./frontend/src/libs/axios.js");
/* harmony import */ var _auth_jwt_useJwt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/auth/jwt/useJwt */ "./frontend/src/auth/jwt/useJwt.js");
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

/* eslint-disable global-require */








/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    BRow: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BRow"],
    BCol: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BCol"],
    BLink: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BLink"],
    BFormGroup: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BFormGroup"],
    BFormInput: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BFormInput"],
    BInputGroupAppend: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BInputGroupAppend"],
    BInputGroup: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BInputGroup"],
    BFormCheckbox: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BFormCheckbox"],
    BCardText: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BCardText"],
    BCardTitle: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BCardTitle"],
    BImg: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BImg"],
    BForm: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BForm"],
    BButton: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BButton"],
    VuexyLogo: _core_layouts_components_Logo_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    ValidationProvider: vee_validate__WEBPACK_IMPORTED_MODULE_0__["ValidationProvider"],
    ValidationObserver: vee_validate__WEBPACK_IMPORTED_MODULE_0__["ValidationObserver"]
  },
  mixins: [_core_mixins_ui_forms__WEBPACK_IMPORTED_MODULE_4__["togglePasswordVisibility"]],
  data: function data() {
    return {
      status: '',
      shop_name: '',
      name: '',
      password: '',
      password_confirmation: '',
      email: '',
      loading: false,
      sideImg: __webpack_require__(/*! @/assets/images/pages/login-v2.svg */ "./frontend/src/assets/images/pages/login-v2.svg"),
      // validation rulesimport store from '@/store/index'
      required: _validations__WEBPACK_IMPORTED_MODULE_3__["required"],
      passwordFieldType1: 'password',
      passwordFieldType2: 'password'
    };
  },
  computed: {
    passwordToggleIcon: function passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon';
    },
    imgUrl: function imgUrl() {
      if (_store_index__WEBPACK_IMPORTED_MODULE_5__["default"].state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = __webpack_require__(/*! @/assets/images/pages/login-v2-dark.svg */ "./frontend/src/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }

      return this.sideImg;
    }
  },
  methods: {
    validationForm: function validationForm() {
      var _this = this;

      this.loading = true;
      this.$refs.loginValidation.validate().then(function (success) {
        if (success) {
          _libs_axios__WEBPACK_IMPORTED_MODULE_6__["default"].post('api/v1/shop/register', {
            shop_name: _this.shop_name,
            name: _this.name,
            email: _this.email,
            password: _this.password,
            password_confirmation: _this.password_confirmation
          }).then(function (response) {
            // console.log('response.data')
            // console.log(response)
            // useJwt.setToken(response.data.access_token)
            _this.$router.push({
              name: 'user.email.verify',
              query: {
                email: _this.email
              }
            });
          })["catch"](function (error) {
            // console.log(error)
            _this.$refs.loginValidation.setErrors(error.response.data.errors);

            if (error.response.status === 500) {
              _this.$bvToast.toast('Something went wrong!', {
                title: 'Failed',
                variant: 'danger',
                solid: true
              });
            }

            _this.loading = false;
          });
        }
      });
    },
    togglePassword1: function togglePassword1() {
      this.passwordFieldType1 = this.passwordFieldType1 === 'password' ? 'text' : 'password';
    },
    togglePassword2: function togglePassword2() {
      this.passwordFieldType2 = this.passwordFieldType2 === 'password' ? 'text' : 'password';
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/Register.vue?vue&type=style&index=0&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./frontend/src/views/Register.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".auth-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-preferred-size: 100%;\n      flex-basis: 100%;\n  min-height: 100vh;\n  min-height: calc(var(--vh, 1vh) * 100);\n  width: 100%;\n}\n.auth-wrapper .auth-inner {\n  width: 100%;\n  position: relative;\n}\n.auth-wrapper.auth-v1 {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  overflow: hidden;\n}\n.auth-wrapper.auth-v1 .auth-inner:before {\n  width: 244px;\n  height: 243px;\n  content: \" \";\n  position: absolute;\n  top: -54px;\n}\n[dir] .auth-wrapper.auth-v1 .auth-inner:before {\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPQAAADzCAMAAACG9Mt0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAA9KADAAQAAAABAAAA8wAAAADhQHfUAAAAyVBMVEUAAAD///+AgP+AgP9mZv+AgNWAgP9tbf9gYP+AgP9xcf9mZv+AZuaAgP9dXf90dOhiYv92dv9mZu5mZv93d+53d/9paf94afCAcfFrXvJra/9mZvJzZvJzc/JoaP96b/Rqav91aupsYvV2bOt2bPVxaPZ7cfZqavZyau1waPd4aO9xafBxafh4afB1bfh4avFuZ/F2afJzZvJzZ/N0aPN0bvN3bPR0ae5yZ/R3be93bfR1au9zafBxbPVzavV0a/F0a/ZyafFwaPKZm3nTAAAAQ3RSTlMAAQIEBQYGBwgICQoKCgsLDQ0PDw8PERESExMUFBQWFxgYGhoaGxsdHSAgIiIiIyQlJygqLCwtLi8vLzAzNDU3Nzg7h9vbHgAAA9RJREFUeNrt3ftS2kAUx/Fc1gSyWsErtuJdRDQiiteolb7/QzUoTm07k4AzObuu3/MCez45yWbzT36eZ6b8erO1e1B97baadd+zocJWmg0HaXe/+uqmg2GWtkLT5Lle1m9LdhG2+1lvzuiUO1knEF81yFc1N+35m15kZOGodz1vyLx+v2Lseq/erxtZd/NuweCTtfiwaWLOD5FnsqI7+VnP3y8afnEs3Es/1+H1qvETwuq18B7e6VlwLup1ZM8kWWQBOsrmHL7GVtxvYRZYgQ4ywae61ffsqH5Lbq20bQm6ncp9P2ehJegwE/u+rl95ttSwLrVSc2ANetAU28dSa9Cp2E623bUG3d2VWmn/wBq0XCugQYMGLdVKoOJaoiuok1NdXSW1WAUfRPtRUllflaJf5ZE/O9pXVbZUPTov5c+IDqvtRwStdTgLutoxy6GnGfYb2o+1I2gd+1OiqzfLocvVE7TSDqG1mgodaqfQZbvZC9rXjqG1X45WzqFVKVpk0LLo4lGP0ZGD6KgMnTiITkrQgXYQrYNitHISrYrRsZPouBhdcxJdK0YnTqKTYrR2Eq1BgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRoh9DH59ag86ACoSYOL61B55EUQk1s3VqDzsNHhJpYe7QGncfMSHUxaliCHgcKSXVxeWQJehwdJdXF4dAS9DgkTKqLxuibFeiXODixNi7OrEC/BP+JtbE0WrYA/RrxKNfH2YUF6NegSbk+Gk87xtErN6EsWm88fzeMXpwE9EruLns/l42io4dJFLPo2/Po1w+D6IW7t9Bt2SPx3vOOMfS7eHVZtN54ulg2go56138Ct4XRunE2Ovsmjg46WeddUoUWr6WL0fCoIYgO2/2s91fstDZQjcPL0ePt5flpdXUwqW46uMrS1j95JNpQrW0dHp9UV/uT2m416/8HVGg3qzhpBjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KC/FDpx0pwUo2tOomvF6NhJdFyMVk6iVTE6cBIdeF9vJyvZx/I/AzuIjsrQvoNovwzt4FamSs0Ojrp80PmvoB0zh940pb7azf1yg7t0LIt978uppzbnalfucDW92ZndLPRmKweGPduYJ+zoM5/Dk+gD5NdvLhXXPp88qcUqmEH5G5JZRs6cuxwIAAAAAElFTkSuQmCC\");\n}\n[dir=ltr] .auth-wrapper.auth-v1 .auth-inner:before {\n  left: -46px;\n}\n[dir=rtl] .auth-wrapper.auth-v1 .auth-inner:before {\n  right: -46px;\n}\n@media (max-width: 575.98px) {\n.auth-wrapper.auth-v1 .auth-inner:before {\n    display: none;\n}\n}\n.auth-wrapper.auth-v1 .auth-inner:after {\n  width: 272px;\n  height: 272px;\n  content: \" \";\n  position: absolute;\n  bottom: -55px;\n  z-index: -1;\n}\n[dir] .auth-wrapper.auth-v1 .auth-inner:after {\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARAAAAEQCAMAAABP1NsnAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABEKADAAQAAAABAAABEAAAAAAQWxS2AAAAwFBMVEUAAAD///+AgICAgP9VVaqqVf+qqv+AgL+AgP9mZsxmZv+ZZv+AgNWAgP9tbdttbf+Sbf+AYN+AgN+AgP9xceNmZv+AZuaAZv90dOh0dP9qav+AauqAav+AgP92dv9tbf+Abe2Abf93Zu53d+6AcO94afCAcfF5a+R5a/JzZuaAZvKAc/J5bed5bfOAaPN6b/R1auqAavR6ZvV6cPV2bOuAbPV7aPZ2be2AbfZ7au17avZ3Zu53b+57a+97a/d4aO9J6CoeAAAAQHRSTlMAAQICAwMDBAQFBQUGBgcHBwgICAkKCgoLCwwMDAwNDg4ODw8QERITExQUFBUVFhcYGBkZGhobHBwdHR4eHx8gJ5uMWwAAA/FJREFUeNrt2G1XEkEYxvHZNk2xHGzdbKFl0cTwgdSkCKzu7/+t4pw6sAjtjIueE/f8r3fMO35nZnbuy5gVGcvfzJe0rnTfGI+MggGJRUZnbpPIhJKt88nU53JnFULvyISY6KAv8vPj0vr2rYwiE2Z2B9J+uNYcyyQxwWZvaeGH3G4bMjsvI/kcwTC/V+7kLoahlITzQojP3ZFgsJCh7IJQzpX0QFj4uMiY18eDMZ9bZCF9OQahnK6cm/Y7js0sh/LF3Auv1PlQd3MxbdXYIQspV44EEEAAAWTNDAYYkKdJbNMsLzYueZbaZ2iM46RVbHBaiZ9Js+nHEdli42N9XuSen5hGp1CQTuOJQDRsD99N4gMSpYWapNH6IJo83CIeILZQFesEaber79NCWRoukOpNEnW0gXQqD81w6ACxhbrYde7VuFCYeA2QRCNIsgZISyNIqz6IyhPjOjNVIFYniK3dmKU6QdLaJUimEySrDZLrBMlrgxRKU7sxCw/EMe0CAggggADySJCqxixIkKpNEh6IozELD8RxjQACCCCAAPJIkKrGLEgQXqqAAEJjxrQLCCCAAEJjRmNGY8a0CwgggABCYwYIfQgggNCYMe0CAggggNCY0ZjRmDHtAgIIIIAAQmNGHwIIIDRmTLuAAAIIIDRmNGY0Zky7gAACCCCA0JjRhwACCI0Z0y4ggAACCI0ZjRmNGdMuIIAAAgggNGb0IYAAQmPGtAsIIIAAQmNGY0ZjxrQLCCCAAAIIjRl9CCCA0Jgx7QICCCCA0JjRmNGYMe0CAggggABCY0YfAgggNGZMu4AAAgggNGY0ZjRmTLuAAAIIIIDQmNGHAAIIjRnTLiCAAAIIjRmNGY0ZIEy7gAACCCA0ZvQhgABCY8a0CwgggABCY0ZjBgiNGdMuIIAAAgiN2f/Sh+Q6PfLaIJlOkKw2SKoTJK3dmFmdILb2tBvrBIlrg5iWRo+WqQ+SaARJ1gCJAzsxThCN16p1vNurGjNjoo42j07kAHFskoY2kEbl33U0ZgoPjXW+Rl0gkarnahqtDaJKxMPDDWIiNafGenh4gExvVhXfmk7Da6L1AVGxSby2h6MxK79Zk42ea1pJbJ48sU2zDezQ8iy1z6BBwoyjMQsvXp8YQAAhgADilRfyy+wf8WqZZUfGZihvgZiB3FybC+kCUU5XLkAo50C+gbBQdUzkAIVyejIAYfFTI1solHP2HgNCnHn5AYNy4jvpoVB6fVzL91cwzLJ9Lfd7S0jhehxO5H5/yePr1W6gHonI7fJ5ORSR/n6Q2yQanq763zuXU5LJZRKiyD/W9/pjkdPZz0/yJ8fqVyry+qQZDMjJKoDfy8bRVhHhQTwAAAAASUVORK5CYII=\");\n}\n[dir=ltr] .auth-wrapper.auth-v1 .auth-inner:after {\n  right: -75px;\n}\n[dir=rtl] .auth-wrapper.auth-v1 .auth-inner:after {\n  left: -75px;\n}\n@media (max-width: 575.98px) {\n.auth-wrapper.auth-v1 .auth-inner:after {\n    display: none;\n}\n}\n.auth-wrapper.auth-v2 {\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n}\n.auth-wrapper.auth-v2 .auth-inner {\n  height: 100vh;\n  overflow-y: auto;\n  height: calc(var(--vh, 1vh) * 100);\n}\n.auth-wrapper.auth-v2 .brand-logo {\n  position: absolute;\n  top: 2rem;\n  z-index: 1;\n}\n[dir] .auth-wrapper.auth-v2 .brand-logo {\n  margin: 0;\n}\n[dir=ltr] .auth-wrapper.auth-v2 .brand-logo {\n  left: 2rem;\n}\n[dir=rtl] .auth-wrapper.auth-v2 .brand-logo {\n  right: 2rem;\n}\n.auth-wrapper.auth-v1 .auth-inner {\n  max-width: 400px;\n}\n.auth-wrapper .brand-logo {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n[dir] .auth-wrapper .brand-logo {\n  margin: 1rem 0 2rem 0;\n}\n.auth-wrapper .brand-logo .brand-text {\n  font-weight: 600;\n}\n[dir] .auth-wrapper .auth-footer-btn .btn {\n  padding: 0.6rem !important;\n}\n[dir=ltr] .auth-wrapper .auth-footer-btn .btn:not(:last-child) {\n  margin-right: 1rem;\n}\n[dir=rtl] .auth-wrapper .auth-footer-btn .btn:not(:last-child) {\n  margin-left: 1rem;\n}\n@media (min-width: 1200px) {\n.auth-wrapper.auth-v2 .auth-card {\n    width: 400px;\n}\n}\n[dir] .auth-wrapper .auth-bg {\n  background-color: #fff;\n}\n[dir] .dark-layout .auth-wrapper .auth-bg {\n  background-color: #283046;\n}\n.brand-logo svg {\n  height: 28px;\n  width: 40.95px;\n}\nhtml[dir=rtl] svg.feather {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/Register.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./frontend/src/views/Register.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Register.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/Register.vue?vue&type=style&index=0&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/@core/layouts/components/Logo.vue?vue&type=template&id=556c28d4&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./frontend/src/@core/layouts/components/Logo.vue?vue&type=template&id=556c28d4& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
    "svg",
    {
      attrs: {
        viewBox: "0 0 139 95",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        height: "24"
      }
    },
    [
      _c(
        "defs",
        [
          _c(
            "linearGradient",
            {
              attrs: {
                id: "linearGradient-1",
                x1: "100%",
                y1: "10.5120544%",
                x2: "50%",
                y2: "89.4879456%"
              }
            },
            [
              _c("stop", { attrs: { "stop-color": "#000000", offset: "0%" } }),
              _vm._v(" "),
              _c("stop", { attrs: { "stop-color": "#FFFFFF", offset: "100%" } })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "linearGradient",
            {
              attrs: {
                id: "linearGradient-2",
                x1: "64.0437835%",
                y1: "46.3276743%",
                x2: "37.373316%",
                y2: "100%"
              }
            },
            [
              _c("stop", {
                attrs: {
                  "stop-color": "#EEEEEE",
                  "stop-opacity": "0",
                  offset: "0%"
                }
              }),
              _vm._v(" "),
              _c("stop", { attrs: { "stop-color": "#FFFFFF", offset: "100%" } })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "g",
        {
          attrs: {
            id: "Page-1",
            stroke: "none",
            "stroke-width": "1",
            fill: "none",
            "fill-rule": "evenodd"
          }
        },
        [
          _c(
            "g",
            {
              attrs: {
                id: "Artboard",
                transform: "translate(-400.000000, -178.000000)"
              }
            },
            [
              _c(
                "g",
                {
                  attrs: {
                    id: "Group",
                    transform: "translate(400.000000, 178.000000)"
                  }
                },
                [
                  _c("path", {
                    staticClass: "text-primary",
                    staticStyle: { fill: "currentColor" },
                    attrs: {
                      id: "Path",
                      d:
                        "M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    }
                  }),
                  _vm._v(" "),
                  _c("path", {
                    attrs: {
                      id: "Path1",
                      d:
                        "M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z",
                      fill: "url(#linearGradient-1)",
                      opacity: "0.2"
                    }
                  }),
                  _vm._v(" "),
                  _c("polygon", {
                    attrs: {
                      id: "Path-2",
                      fill: "#000000",
                      opacity: "0.049999997",
                      points:
                        "69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                    }
                  }),
                  _vm._v(" "),
                  _c("polygon", {
                    attrs: {
                      id: "Path-21",
                      fill: "#000000",
                      opacity: "0.099999994",
                      points:
                        "69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                    }
                  }),
                  _vm._v(" "),
                  _c("polygon", {
                    attrs: {
                      id: "Path-3",
                      fill: "url(#linearGradient-2)",
                      opacity: "0.099999994",
                      points:
                        "101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                    }
                  })
                ]
              )
            ]
          )
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/Register.vue?vue&type=template&id=a2590464&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./frontend/src/views/Register.vue?vue&type=template&id=a2590464& ***!
  \******************************************************************************************************************************************************************************************************/
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
    "div",
    { staticClass: "auth-wrapper auth-v2" },
    [
      _c(
        "b-row",
        { staticClass: "auth-inner m-0" },
        [
          _c(
            "b-link",
            { staticClass: "brand-logo" },
            [
              _c("vuexy-logo"),
              _vm._v(" "),
              _c("h2", { staticClass: "brand-text text-primary ml-1" }, [
                _vm._v("\n        Amar Client\n      ")
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            {
              staticClass: "d-none d-lg-flex align-items-center p-5",
              attrs: { lg: "8" }
            },
            [
              _c(
                "div",
                {
                  staticClass:
                    "w-100 d-lg-flex align-items-center justify-content-center px-5"
                },
                [
                  _c("b-img", {
                    attrs: { fluid: "", src: _vm.imgUrl, alt: "Login V2" }
                  })
                ],
                1
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "b-col",
            {
              staticClass: "d-flex align-items-center auth-bg px-2 p-lg-5",
              attrs: { lg: "4" }
            },
            [
              _c(
                "b-col",
                {
                  staticClass: "px-xl-2 mx-auto",
                  attrs: { sm: "8", md: "6", lg: "12" }
                },
                [
                  _c(
                    "b-card-title",
                    {
                      staticClass: "font-weight-bold mb-1",
                      attrs: { "title-tag": "h2" }
                    },
                    [_vm._v("\n          Welcome to Amar Client! ????\n        ")]
                  ),
                  _vm._v(" "),
                  _c("b-card-text", { staticClass: "mb-2" }, [
                    _vm._v("\n          Please sign-up for account\n        ")
                  ]),
                  _vm._v(" "),
                  _c(
                    "validation-observer",
                    { ref: "loginValidation" },
                    [
                      _c(
                        "b-form",
                        {
                          staticClass: "auth-login-form mt-2",
                          on: {
                            submit: function($event) {
                              $event.preventDefault()
                            }
                          }
                        },
                        [
                          _c(
                            "b-form-group",
                            {
                              attrs: {
                                label: "Company Name",
                                "label-for": "shop_name"
                              }
                            },
                            [
                              _c("validation-provider", {
                                attrs: { name: "shop_name", rules: "required" },
                                scopedSlots: _vm._u([
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var errors = ref.errors
                                      return [
                                        _c("b-form-input", {
                                          attrs: {
                                            id: "login-shop_name",
                                            state:
                                              errors.length > 0 ? false : null,
                                            name: "shop_name",
                                            type: "text",
                                            placeholder: "type shop name"
                                          },
                                          model: {
                                            value: _vm.shop_name,
                                            callback: function($$v) {
                                              _vm.shop_name = $$v
                                            },
                                            expression: "shop_name"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "small",
                                          { staticClass: "text-danger" },
                                          [_vm._v(_vm._s(errors[0]))]
                                        )
                                      ]
                                    }
                                  }
                                ])
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-form-group",
                            {
                              attrs: { label: "User Name", "label-for": "name" }
                            },
                            [
                              _c("validation-provider", {
                                attrs: { name: "name", rules: "required" },
                                scopedSlots: _vm._u([
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var errors = ref.errors
                                      return [
                                        _c("b-form-input", {
                                          attrs: {
                                            id: "Name",
                                            state:
                                              errors.length > 0 ? false : null,
                                            name: "name",
                                            placeholder: "type your name"
                                          },
                                          model: {
                                            value: _vm.name,
                                            callback: function($$v) {
                                              _vm.name = $$v
                                            },
                                            expression: "name"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "small",
                                          { staticClass: "text-danger" },
                                          [_vm._v(_vm._s(errors[0]))]
                                        )
                                      ]
                                    }
                                  }
                                ])
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-form-group",
                            {
                              attrs: {
                                label: "Email",
                                "label-for": "login-email"
                              }
                            },
                            [
                              _c("validation-provider", {
                                attrs: { name: "email", rules: "required" },
                                scopedSlots: _vm._u([
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var errors = ref.errors
                                      return [
                                        _c("b-form-input", {
                                          attrs: {
                                            id: "login-email",
                                            state:
                                              errors.length > 0 ? false : null,
                                            name: "email",
                                            placeholder: "user@example.com"
                                          },
                                          model: {
                                            value: _vm.email,
                                            callback: function($$v) {
                                              _vm.email = $$v
                                            },
                                            expression: "email"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "small",
                                          { staticClass: "text-danger" },
                                          [_vm._v(_vm._s(errors[0]))]
                                        )
                                      ]
                                    }
                                  }
                                ])
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-form-group",
                            [
                              _c("validation-provider", {
                                attrs: { name: "password", rules: "required" },
                                scopedSlots: _vm._u([
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var errors = ref.errors
                                      return [
                                        _c(
                                          "b-input-group",
                                          {
                                            staticClass: "input-group-merge",
                                            class:
                                              errors.length > 0
                                                ? "is-invalid"
                                                : null
                                          },
                                          [
                                            _c("b-form-input", {
                                              staticClass: "form-control-merge",
                                              attrs: {
                                                id: "login-password",
                                                state:
                                                  errors.length > 0
                                                    ? false
                                                    : null,
                                                type: _vm.passwordFieldType1,
                                                name: "password",
                                                placeholder: "????????????????????????"
                                              },
                                              model: {
                                                value: _vm.password,
                                                callback: function($$v) {
                                                  _vm.password = $$v
                                                },
                                                expression: "password"
                                              }
                                            }),
                                            _vm._v(" "),
                                            _c(
                                              "b-input-group-append",
                                              { attrs: { "is-text": "" } },
                                              [
                                                _c("feather-icon", {
                                                  staticClass: "cursor-pointer",
                                                  attrs: {
                                                    icon: _vm.passwordToggleIcon
                                                  },
                                                  on: {
                                                    click: _vm.togglePassword1
                                                  }
                                                })
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "small",
                                          { staticClass: "text-danger" },
                                          [_vm._v(_vm._s(errors[0]))]
                                        )
                                      ]
                                    }
                                  }
                                ])
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-form-group",
                            [
                              _c("validation-provider", {
                                attrs: {
                                  name: "password_confirmation",
                                  rules: "required"
                                },
                                scopedSlots: _vm._u([
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var errors = ref.errors
                                      return [
                                        _c(
                                          "b-input-group",
                                          {
                                            staticClass: "input-group-merge",
                                            class:
                                              errors.length > 0
                                                ? "is-invalid"
                                                : null
                                          },
                                          [
                                            _c("b-form-input", {
                                              staticClass: "form-control-merge",
                                              attrs: {
                                                id: "password_confirmation",
                                                state:
                                                  errors.length > 0
                                                    ? false
                                                    : null,
                                                type: _vm.passwordFieldType2,
                                                name: "password_confirmation",
                                                placeholder: "????????????????????????"
                                              },
                                              model: {
                                                value:
                                                  _vm.password_confirmation,
                                                callback: function($$v) {
                                                  _vm.password_confirmation = $$v
                                                },
                                                expression:
                                                  "password_confirmation"
                                              }
                                            }),
                                            _vm._v(" "),
                                            _c(
                                              "b-input-group-append",
                                              { attrs: { "is-text": "" } },
                                              [
                                                _c("feather-icon", {
                                                  staticClass: "cursor-pointer",
                                                  attrs: {
                                                    icon: _vm.passwordToggleIcon
                                                  },
                                                  on: {
                                                    click: _vm.togglePassword2
                                                  }
                                                })
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "small",
                                          { staticClass: "text-danger" },
                                          [_vm._v(_vm._s(errors[0]))]
                                        )
                                      ]
                                    }
                                  }
                                ])
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-form-group",
                            [
                              _c(
                                "b-form-checkbox",
                                {
                                  attrs: {
                                    id: "remember-me",
                                    name: "checkbox-1"
                                  },
                                  model: {
                                    value: _vm.status,
                                    callback: function($$v) {
                                      _vm.status = $$v
                                    },
                                    expression: "status"
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                Remember Me\n              "
                                  )
                                ]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _vm.loading
                            ? _c(
                                "b-button",
                                {
                                  attrs: {
                                    type: "submit",
                                    variant: "primary",
                                    block: ""
                                  }
                                },
                                [_c("b-spinner", { attrs: { small: "" } })],
                                1
                              )
                            : _c(
                                "b-button",
                                {
                                  attrs: {
                                    type: "submit",
                                    variant: "primary",
                                    block: ""
                                  },
                                  on: { click: _vm.validationForm }
                                },
                                [_c("span", [_vm._v("Sign up")])]
                              )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-card-text",
                    { staticClass: "text-center mt-2" },
                    [
                      _c("span", [_vm._v("Already have an account? ")]),
                      _vm._v(" "),
                      _c("b-link", { attrs: { to: { name: "user.login" } } }, [
                        _c("span", [_vm._v("Sign in here")])
                      ])
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
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);