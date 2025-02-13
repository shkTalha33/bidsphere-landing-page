import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    isMobileLogin: false,
    userType: '',
    code: '',
    tempData: null,
    storeData: null,
    updated: 0,
    applicationDetail: null,
    accessToken: '',
    isForgotPassword: false,
    forgotCode: null,
    userZipcode: null,
    refreshToken: '',
    latlng: {},
    subscriptionData: null,
    userData: null,
    currentLocation: null,
    deliveryAddress: null,
    selectedAddress: null,
    selectedPayment: null,
    paymentDetail: null,
    orderData: null,
    lang: { code: 'en', name: 'English', flag: '🇺🇸' },
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    getCurrentLatLng(state, action) {
      state.latlng = action.payload;
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setStoreData: (state, action) => {
      state.storeData = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setIsMobileLogin: (state, action) => {
      state.isMobileLogin = action.payload;
    },
    setApplicationDetail: (state, action) => {
      state.applicationDetail = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setTempData: (state, action) => {
      state.tempData = action.payload;
    },
    setIsForgotPassword: (state, action) => {
      state.isForgotPassword = action.payload;
    },
    setForgotCode: (state, action) => {
      state.forgotCode = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setSubscriptionData: (state, action) => {
      state.subscriptionData = action.payload;
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setUserZipcode: (state, action) => {
      state.userZipcode = action.payload;
    },
    setDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setSelectedPayment: (state, action) => {
      state.selectedPayment = action.payload;
    },
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    },
    setPaymentDetail: (state, action) => {
      state.paymentDetail = action.payload;
    },
    setLogout: (state, action) => {
      state.isLogin = false;
      state.isMobileLogin = false;
      state.userType = '';
      state.code = '';
      state.tempData = null;
      state.storeData = null;
      state.updated = 0;
      state.applicationDetail = null;
      state.accessToken = '';
      state.isForgotPassword = false;
      state.forgotCode = null;
      state.userZipcode = null;
      state.deliveryAddress = null;
      state.selectedPayment = null;
      state.paymentDetail = null;
      state.orderData = null;
      state.paymentDetail = null;
      state.refreshToken = '';
      state.latlng = {};
      state.subscriptionData = null;
      state.userData = null;
      state.currentLocation = null,
      localStorage.removeItem('setofshops_user_token')
    },
    handleLogin: (state, action) => {
      state.userData = action.payload
    },
    handleUserData: (state, action) => {
      state.updated = action.payload
    },
  },
});

export const { setLogin, setLang, handleLogin, setOrderData, setPaymentDetail, setSelectedPayment, setSelectedAddress, setDeliveryAddress, setLogout, setTempData, setStoreData, getCurrentLatLng, setUserZipcode, setCode, setIsMobileLogin, code, setUserType, userType, setForgotCode, setIsForgotPassword, setAccessToken, setRefreshToken, setCurrentLocation, setSubscriptionData, handleUserData, setApplicationDetail, setUserData } = authSlice.actions;

export default authSlice.reducer;