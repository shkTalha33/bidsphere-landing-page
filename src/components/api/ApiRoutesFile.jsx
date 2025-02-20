// login api
const login = "auth";
const sendCode = "users/send-code"
const verifyCode = "users/verify-otp/registration"
const checkMail = "users/check-email"
const checkPhone = "users/check-phone"
const sendCodeForgotPassword = "users/forget-password"
const verifyCodeForgotPassword = "users/verify-otp/forget-password"
const forgotPassword = "users/update-password"
const signup = "users/signup"
const changePassword = "users/change-password"
const updateUser = "users/update-user"
const deleteUser = "users"

// "upload files"
const imageUpload = "image/upload"

export {
  login,
  imageUpload, sendCode, verifyCode, changePassword, checkMail, checkPhone, signup, deleteUser, updateUser, sendCodeForgotPassword, verifyCodeForgotPassword, forgotPassword,
};