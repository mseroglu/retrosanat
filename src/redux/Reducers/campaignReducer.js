import ActionTypes from "../../constants/ActionTypes"

const initialState = {
   isLoading: false,
   error: null,
   campaigns: [],
}

const campaignsReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case ActionTypes.CAMPAIGNS_LOADING:
         return { ...state, isLoading: true }

      case ActionTypes.CAMPAIGNS_ERROR:
         return { ...state, isLoading: false, error: payload }

      case ActionTypes.CAMPAIGNS_SUCCESS:
         return { ...state, isLoading: false, error: null, campaigns: payload }

      case ActionTypes.CAMPAIGN_ADD_STORE:
         return { ...state, campaigns: [...state.campaigns, payload] }

      default:
         return state
   }

}
export default campaignsReducer