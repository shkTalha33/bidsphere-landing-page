// login api
const login = "auth";
const sendCode = "users/send-code";
const verifyCode = "users/verify-otp/registration";
const checkMail = "users/check-email";
const checkPhone = "users/check-phone";
const sendCodeForgotPassword = "users/forget-password";
const verifyCodeForgotPassword = "users/verify-otp/forget-password";
const forgotPassword = "users/update-password";
const signup = "users/signup";
const changePassword = "users/change-password";
const updateUser = "users/update-user";
const deleteUser = "users";
const getAuctions = "auction/all";
const getAuctionLot = "lot/details/";

// "upload files"
const imageUpload = "image/upload";
const filUploadAPi = "image/video";
const auctionDetail = "auction/details/";
const likeAuction = "auction/like/";
const getFavouriteAuctions = "/auction/fav/me/";
const auctionRegistration = "auction/registration/";
const editAuctionRegistration = "auction/edit-registration/";
const registrationTracking = "auction/me/registration/";
const getLatestCurrencyRate = "users/data";

// huraira
const getCategory = "cat/all";
const checkPhoneNumber = "users/check-phone";
const getAuctionByCategory = "catId";

const getLiveChat = "msg/liveChat";

// order api start
const GetOrders = "auction/customer/order";
const orderGetbyid = "auction/order/details";
// chat api start
const getAllConversation = "auction/conversations";
const getUserMessage = "auction/messages";
const updateProfile = "users/update-user";

const getPrivacy = "users/privacy";
const getTerms = "users/terms";
const getUserProfile = "users/me";
const getInvoice = "auction/customer/invoices";
const invoicePayment = "auction/update-invoice";
const GetFooter = "users/footer";
const contactUsApi = "support/create";
const getNotification = "notification/all";
const deleteNotification = "notification";
const seenNotification = "notification/check-seen";
const getstripKey = "payment/key";
const createPaymentStripe = "payment/create";
export {
  login,
  imageUpload,
  sendCode,
  verifyCode,
  changePassword,
  checkMail,
  checkPhone,
  signup,
  deleteUser,
  updateUser,
  sendCodeForgotPassword,
  verifyCodeForgotPassword,
  forgotPassword,
  getAuctions,
  auctionDetail,
  getAuctionLot,
  likeAuction,
  getFavouriteAuctions,
  auctionRegistration,
  registrationTracking,
  editAuctionRegistration,
  getLatestCurrencyRate,
  getCategory,
  checkPhoneNumber,
  getAuctionByCategory,
  getLiveChat,
  GetOrders,
  orderGetbyid,
  getAllConversation,
  getUserMessage,
  updateProfile,
  getPrivacy,
  getTerms,
  getUserProfile,
  getInvoice,
  invoicePayment,
  GetFooter,
  filUploadAPi,
  contactUsApi,
  getNotification,
  deleteNotification,
  seenNotification,
  getstripKey,
  createPaymentStripe,
};
