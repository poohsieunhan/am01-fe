import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "../features/company/companySlice";
import assetReducer from "../features/asset/assetSlice";
import assetTypeReducer from "../features/assetType/assetTypeSlice";
import projectReducer from "../features/project/projectSlice";
import accountReducer from "../features/account/accountSlice";
import emailConfigReducer from "../features/emailConfig/emailConfigSlice";
import emailRecipientReducer from "../features/emailRecipient/emailRecipientSlice";
import assetTypeNotificationReducer from "../features/assetTypeNotification/assetTypeNotificationSlice";
import assetNotificationReducer from "../features/assetNotification/assetNotificationSlice";
import userReducer from "../features/user/userSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    asset: assetReducer,
    assetType: assetTypeReducer,
    project: projectReducer,
    account: accountReducer,
    emailConfig: emailConfigReducer,
    emailRecipient: emailRecipientReducer,
    assetTypeNotification: assetTypeNotificationReducer,
    assetNotification: assetNotificationReducer,
    user: userReducer,
  },
});

export default store;
