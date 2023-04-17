// export const getFilteredDetails = (data) =>
//   getApi<GetFilteredDetailsPayload, GetFilteredDetailsResponse>(
//     API_ROUTES.FILTERED_DETAILS,
//     data
//   );

import { postApi } from "api/apiHelper";
import { API_ROUTES } from "constants/apiRoutes";
import { IPostSignInPayload } from "types/auth.types";

//POST /apply_filters?section=actual_plan
export const postSignIn = (postSignInPayload: IPostSignInPayload) =>
  postApi(API_ROUTES.SIGN_IN, postSignInPayload);

export const postSignUp = (postSignUpPayload: IPostSignInPayload) =>
  postApi(API_ROUTES.SIGN_UP, postSignUpPayload);
