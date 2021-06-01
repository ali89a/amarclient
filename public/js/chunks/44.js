(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[44],{

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
      email: 'البريد الإلكتروني',
      password: 'كلمة السر'
    },
    fields: {
      password: {
        min: 'كلمة السر قصيرة جداً سيتم اختراقك'
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

/***/ "./frontend/src/views/shop/verify.vue":
/*!********************************************!*\
  !*** ./frontend/src/views/shop/verify.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _verify_vue_vue_type_template_id_0c097c77___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./verify.vue?vue&type=template&id=0c097c77& */ "./frontend/src/views/shop/verify.vue?vue&type=template&id=0c097c77&");
/* harmony import */ var _verify_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./verify.vue?vue&type=script&lang=js& */ "./frontend/src/views/shop/verify.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _verify_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./verify.vue?vue&type=style&index=0&lang=scss& */ "./frontend/src/views/shop/verify.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _verify_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _verify_vue_vue_type_template_id_0c097c77___WEBPACK_IMPORTED_MODULE_0__["render"],
  _verify_vue_vue_type_template_id_0c097c77___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "frontend/src/views/shop/verify.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./frontend/src/views/shop/verify.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./frontend/src/views/shop/verify.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_verify_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./verify.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/shop/verify.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_verify_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./frontend/src/views/shop/verify.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************!*\
  !*** ./frontend/src/views/shop/verify.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_verify_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./verify.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/shop/verify.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_verify_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_verify_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_verify_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_verify_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./frontend/src/views/shop/verify.vue?vue&type=template&id=0c097c77&":
/*!***************************************************************************!*\
  !*** ./frontend/src/views/shop/verify.vue?vue&type=template&id=0c097c77& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_verify_vue_vue_type_template_id_0c097c77___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./verify.vue?vue&type=template&id=0c097c77& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/shop/verify.vue?vue&type=template&id=0c097c77&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_verify_vue_vue_type_template_id_0c097c77___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_verify_vue_vue_type_template_id_0c097c77___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/shop/verify.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./frontend/src/views/shop/verify.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _themeConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @themeConfig */ "./frontend/themeConfig.js");
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vee-validate */ "./frontend/node_modules/vee-validate/dist/vee-validate.esm.js");
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

/* eslint-disable global-require */








/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    BRow: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BRow"],
    BCol: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BCol"],
    BLink: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BLink"],
    BFormGroup: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BFormGroup"],
    BFormInput: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BFormInput"],
    BCardText: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BCardText"],
    BCardTitle: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BCardTitle"],
    BImg: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BImg"],
    BForm: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BForm"],
    BButton: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BButton"],
    ValidationProvider: vee_validate__WEBPACK_IMPORTED_MODULE_1__["ValidationProvider"],
    ValidationObserver: vee_validate__WEBPACK_IMPORTED_MODULE_1__["ValidationObserver"]
  },
  mixins: [_core_mixins_ui_forms__WEBPACK_IMPORTED_MODULE_4__["togglePasswordVisibility"]],
  data: function data() {
    return {
      verification_code: '',
      loading: false,
      sideImg: __webpack_require__(/*! @/assets/images/pages/login-v2.svg */ "./frontend/src/assets/images/pages/login-v2.svg"),
      // validation rulesimport store from '@/store/index'
      required: _validations__WEBPACK_IMPORTED_MODULE_3__["required"]
    };
  },
  setup: function setup(props) {
    // App Name
    var _$themeConfig$app = _themeConfig__WEBPACK_IMPORTED_MODULE_0__["$themeConfig"].app,
        appName = _$themeConfig$app.appName,
        appLogoImage = _$themeConfig$app.appLogoImage;
    return {
      appName: appName,
      appLogoImage: appLogoImage
    };
  },
  computed: {
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
          var _this$$route$query$em;

          _libs_axios__WEBPACK_IMPORTED_MODULE_6__["default"].post('api/v1/shop/verify', {
            email: (_this$$route$query$em = _this.$route.query.email) !== null && _this$$route$query$em !== void 0 ? _this$$route$query$em : null,
            verification_code: _this.verification_code
          }).then(function (response) {
            // useJwt.setToken(response.data.access_token)
            // useJwt.setRefreshToken(response.data.refresh_token)
            console.log(response);

            if (response.data.success) {
              localStorage.setItem('userAccessToken', response.data.access_token);
              localStorage.setItem('userData', JSON.stringify(response.data.userData));

              _this.$router.push({
                name: 'user.homepage'
              });
            }
          })["catch"](function (error) {
            console.log(error);

            _this.$refs.loginValidation.setErrors(error.response.data.errors);

            _this.loading = false; // this.errors = error.response.data.errors
          });
        }
      });
    },
    resendCode: function resendCode() {
      var _this2 = this;

      _libs_axios__WEBPACK_IMPORTED_MODULE_6__["default"].post('api/v1/shop/verify/resend', {
        email: this.$route.query.email
      }).then(function (response) {
        _this2.$bvToast.toast(response.data.message, {
          title: 'Success',
          variant: 'success',
          solid: true
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/shop/verify.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./frontend/src/views/shop/verify.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".auth-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-preferred-size: 100%;\n      flex-basis: 100%;\n  min-height: 100vh;\n  min-height: calc(var(--vh, 1vh) * 100);\n  width: 100%;\n}\n.auth-wrapper .auth-inner {\n  width: 100%;\n  position: relative;\n}\n.auth-wrapper.auth-v1 {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  overflow: hidden;\n}\n.auth-wrapper.auth-v1 .auth-inner:before {\n  width: 244px;\n  height: 243px;\n  content: \" \";\n  position: absolute;\n  top: -54px;\n}\n[dir] .auth-wrapper.auth-v1 .auth-inner:before {\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPQAAADzCAMAAACG9Mt0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAA9KADAAQAAAABAAAA8wAAAADhQHfUAAAAyVBMVEUAAAD///+AgP+AgP9mZv+AgNWAgP9tbf9gYP+AgP9xcf9mZv+AZuaAgP9dXf90dOhiYv92dv9mZu5mZv93d+53d/9paf94afCAcfFrXvJra/9mZvJzZvJzc/JoaP96b/Rqav91aupsYvV2bOt2bPVxaPZ7cfZqavZyau1waPd4aO9xafBxafh4afB1bfh4avFuZ/F2afJzZvJzZ/N0aPN0bvN3bPR0ae5yZ/R3be93bfR1au9zafBxbPVzavV0a/F0a/ZyafFwaPKZm3nTAAAAQ3RSTlMAAQIEBQYGBwgICQoKCgsLDQ0PDw8PERESExMUFBQWFxgYGhoaGxsdHSAgIiIiIyQlJygqLCwtLi8vLzAzNDU3Nzg7h9vbHgAAA9RJREFUeNrt3ftS2kAUx/Fc1gSyWsErtuJdRDQiiteolb7/QzUoTm07k4AzObuu3/MCez45yWbzT36eZ6b8erO1e1B97baadd+zocJWmg0HaXe/+uqmg2GWtkLT5Lle1m9LdhG2+1lvzuiUO1knEF81yFc1N+35m15kZOGodz1vyLx+v2Lseq/erxtZd/NuweCTtfiwaWLOD5FnsqI7+VnP3y8afnEs3Es/1+H1qvETwuq18B7e6VlwLup1ZM8kWWQBOsrmHL7GVtxvYRZYgQ4ywae61ffsqH5Lbq20bQm6ncp9P2ehJegwE/u+rl95ttSwLrVSc2ANetAU28dSa9Cp2E623bUG3d2VWmn/wBq0XCugQYMGLdVKoOJaoiuok1NdXSW1WAUfRPtRUllflaJf5ZE/O9pXVbZUPTov5c+IDqvtRwStdTgLutoxy6GnGfYb2o+1I2gd+1OiqzfLocvVE7TSDqG1mgodaqfQZbvZC9rXjqG1X45WzqFVKVpk0LLo4lGP0ZGD6KgMnTiITkrQgXYQrYNitHISrYrRsZPouBhdcxJdK0YnTqKTYrR2Eq1BgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRoh9DH59ag86ACoSYOL61B55EUQk1s3VqDzsNHhJpYe7QGncfMSHUxaliCHgcKSXVxeWQJehwdJdXF4dAS9DgkTKqLxuibFeiXODixNi7OrEC/BP+JtbE0WrYA/RrxKNfH2YUF6NegSbk+Gk87xtErN6EsWm88fzeMXpwE9EruLns/l42io4dJFLPo2/Po1w+D6IW7t9Bt2SPx3vOOMfS7eHVZtN54ulg2go56138Ct4XRunE2Ovsmjg46WeddUoUWr6WL0fCoIYgO2/2s91fstDZQjcPL0ePt5flpdXUwqW46uMrS1j95JNpQrW0dHp9UV/uT2m416/8HVGg3qzhpBjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KC/FDpx0pwUo2tOomvF6NhJdFyMVk6iVTE6cBIdeF9vJyvZx/I/AzuIjsrQvoNovwzt4FamSs0Ojrp80PmvoB0zh940pb7azf1yg7t0LIt978uppzbnalfucDW92ZndLPRmKweGPduYJ+zoM5/Dk+gD5NdvLhXXPp88qcUqmEH5G5JZRs6cuxwIAAAAAElFTkSuQmCC\");\n}\n[dir=ltr] .auth-wrapper.auth-v1 .auth-inner:before {\n  left: -46px;\n}\n[dir=rtl] .auth-wrapper.auth-v1 .auth-inner:before {\n  right: -46px;\n}\n@media (max-width: 575.98px) {\n.auth-wrapper.auth-v1 .auth-inner:before {\n    display: none;\n}\n}\n.auth-wrapper.auth-v1 .auth-inner:after {\n  width: 272px;\n  height: 272px;\n  content: \" \";\n  position: absolute;\n  bottom: -55px;\n  z-index: -1;\n}\n[dir] .auth-wrapper.auth-v1 .auth-inner:after {\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARAAAAEQCAMAAABP1NsnAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABEKADAAQAAAABAAABEAAAAAAQWxS2AAAAwFBMVEUAAAD///+AgICAgP9VVaqqVf+qqv+AgL+AgP9mZsxmZv+ZZv+AgNWAgP9tbdttbf+Sbf+AYN+AgN+AgP9xceNmZv+AZuaAZv90dOh0dP9qav+AauqAav+AgP92dv9tbf+Abe2Abf93Zu53d+6AcO94afCAcfF5a+R5a/JzZuaAZvKAc/J5bed5bfOAaPN6b/R1auqAavR6ZvV6cPV2bOuAbPV7aPZ2be2AbfZ7au17avZ3Zu53b+57a+97a/d4aO9J6CoeAAAAQHRSTlMAAQICAwMDBAQFBQUGBgcHBwgICAkKCgoLCwwMDAwNDg4ODw8QERITExQUFBUVFhcYGBkZGhobHBwdHR4eHx8gJ5uMWwAAA/FJREFUeNrt2G1XEkEYxvHZNk2xHGzdbKFl0cTwgdSkCKzu7/+t4pw6sAjtjIueE/f8r3fMO35nZnbuy5gVGcvfzJe0rnTfGI+MggGJRUZnbpPIhJKt88nU53JnFULvyISY6KAv8vPj0vr2rYwiE2Z2B9J+uNYcyyQxwWZvaeGH3G4bMjsvI/kcwTC/V+7kLoahlITzQojP3ZFgsJCh7IJQzpX0QFj4uMiY18eDMZ9bZCF9OQahnK6cm/Y7js0sh/LF3Auv1PlQd3MxbdXYIQspV44EEEAAAWTNDAYYkKdJbNMsLzYueZbaZ2iM46RVbHBaiZ9Js+nHEdli42N9XuSen5hGp1CQTuOJQDRsD99N4gMSpYWapNH6IJo83CIeILZQFesEaber79NCWRoukOpNEnW0gXQqD81w6ACxhbrYde7VuFCYeA2QRCNIsgZISyNIqz6IyhPjOjNVIFYniK3dmKU6QdLaJUimEySrDZLrBMlrgxRKU7sxCw/EMe0CAggggADySJCqxixIkKpNEh6IozELD8RxjQACCCCAAPJIkKrGLEgQXqqAAEJjxrQLCCCAAEJjRmNGY8a0CwgggABCYwYIfQgggNCYMe0CAggggNCY0ZjRmDHtAgIIIIAAQmNGHwIIIDRmTLuAAAIIIDRmNGY0Zky7gAACCCCA0JjRhwACCI0Z0y4ggAACCI0ZjRmNGdMuIIAAAgggNGb0IYAAQmPGtAsIIIAAQmNGY0ZjxrQLCCCAAAIIjRl9CCCA0Jgx7QICCCCA0JjRmNGYMe0CAggggABCY0YfAgggNGZMu4AAAgggNGY0ZjRmTLuAAAIIIIDQmNGHAAIIjRnTLiCAAAIIjRmNGY0ZIEy7gAACCCA0ZvQhgABCY8a0CwgggABCY0ZjBgiNGdMuIIAAAgiN2f/Sh+Q6PfLaIJlOkKw2SKoTJK3dmFmdILb2tBvrBIlrg5iWRo+WqQ+SaARJ1gCJAzsxThCN16p1vNurGjNjoo42j07kAHFskoY2kEbl33U0ZgoPjXW+Rl0gkarnahqtDaJKxMPDDWIiNafGenh4gExvVhXfmk7Da6L1AVGxSby2h6MxK79Zk42ea1pJbJ48sU2zDezQ8iy1z6BBwoyjMQsvXp8YQAAhgADilRfyy+wf8WqZZUfGZihvgZiB3FybC+kCUU5XLkAo50C+gbBQdUzkAIVyejIAYfFTI1solHP2HgNCnHn5AYNy4jvpoVB6fVzL91cwzLJ9Lfd7S0jhehxO5H5/yePr1W6gHonI7fJ5ORSR/n6Q2yQanq763zuXU5LJZRKiyD/W9/pjkdPZz0/yJ8fqVyry+qQZDMjJKoDfy8bRVhHhQTwAAAAASUVORK5CYII=\");\n}\n[dir=ltr] .auth-wrapper.auth-v1 .auth-inner:after {\n  right: -75px;\n}\n[dir=rtl] .auth-wrapper.auth-v1 .auth-inner:after {\n  left: -75px;\n}\n@media (max-width: 575.98px) {\n.auth-wrapper.auth-v1 .auth-inner:after {\n    display: none;\n}\n}\n.auth-wrapper.auth-v2 {\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n}\n.auth-wrapper.auth-v2 .auth-inner {\n  height: 100vh;\n  overflow-y: auto;\n  height: calc(var(--vh, 1vh) * 100);\n}\n.auth-wrapper.auth-v2 .brand-logo {\n  position: absolute;\n  top: 2rem;\n  z-index: 1;\n}\n[dir] .auth-wrapper.auth-v2 .brand-logo {\n  margin: 0;\n}\n[dir=ltr] .auth-wrapper.auth-v2 .brand-logo {\n  left: 2rem;\n}\n[dir=rtl] .auth-wrapper.auth-v2 .brand-logo {\n  right: 2rem;\n}\n.auth-wrapper.auth-v1 .auth-inner {\n  max-width: 400px;\n}\n.auth-wrapper .brand-logo {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n[dir] .auth-wrapper .brand-logo {\n  margin: 1rem 0 2rem 0;\n}\n.auth-wrapper .brand-logo .brand-text {\n  font-weight: 600;\n}\n[dir] .auth-wrapper .auth-footer-btn .btn {\n  padding: 0.6rem !important;\n}\n[dir=ltr] .auth-wrapper .auth-footer-btn .btn:not(:last-child) {\n  margin-right: 1rem;\n}\n[dir=rtl] .auth-wrapper .auth-footer-btn .btn:not(:last-child) {\n  margin-left: 1rem;\n}\n@media (min-width: 1200px) {\n.auth-wrapper.auth-v2 .auth-card {\n    width: 400px;\n}\n}\n[dir] .auth-wrapper .auth-bg {\n  background-color: #fff;\n}\n[dir] .dark-layout .auth-wrapper .auth-bg {\n  background-color: #283046;\n}\n.brand-logo svg {\n  height: 28px;\n  width: 40.95px;\n}\nhtml[dir=rtl] svg.feather {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/shop/verify.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./frontend/src/views/shop/verify.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./verify.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/shop/verify.vue?vue&type=style&index=0&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./frontend/src/views/shop/verify.vue?vue&type=template&id=0c097c77&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./frontend/src/views/shop/verify.vue?vue&type=template&id=0c097c77& ***!
  \*********************************************************************************************************************************************************************************************************/
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
          _c("b-link", { staticClass: "brand-logo" }, [
            _c("img", {
              attrs: { src: _vm.appLogoImage, alt: "", width: "100px" }
            })
          ]),
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
                    [_vm._v("\n          Welcome to Amar Client!\n        ")]
                  ),
                  _vm._v(" "),
                  _c("b-card-text", { staticClass: "mb-2" }, [
                    _vm._v(
                      "\n          Please verify your email address\n        "
                    )
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
                                label: "Verification code",
                                "label-for": "verification_code"
                              }
                            },
                            [
                              _c("validation-provider", {
                                attrs: {
                                  name: "verification_code",
                                  rules: "required"
                                },
                                scopedSlots: _vm._u([
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var errors = ref.errors
                                      return [
                                        _c("b-form-input", {
                                          attrs: {
                                            id: "verification_code",
                                            state:
                                              errors.length > 0 ? false : null,
                                            name: "verification_code",
                                            placeholder: "code"
                                          },
                                          model: {
                                            value: _vm.verification_code,
                                            callback: function($$v) {
                                              _vm.verification_code = $$v
                                            },
                                            expression: "verification_code"
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
                                [_c("span", [_vm._v("Submit")])]
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
                      _c("span", [_vm._v("Yet not get code? ")]),
                      _vm._v(" "),
                      _c(
                        "b-link",
                        {
                          attrs: { to: "" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.resendCode($event)
                            }
                          }
                        },
                        [_c("span", [_vm._v("Resend")])]
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