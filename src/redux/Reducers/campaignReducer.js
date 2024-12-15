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

      case ActionTypes.CAMPAIGN_ADD:
         return { ...state, campaigns: [...state.campaigns, payload] }

      case ActionTypes.CAMPAIGN_DEL:
         const filtred = state.campaigns.filter(item => item.id == payload)
         return { ...state, isLoading: false, error: null, campaigns: filtred }

      case ActionTypes.CAMPAIGN_UPDATE:
         const updated = state.campaigns.map(item => item.id == payload.id ? payload : item)
         return { ...state, isLoading: false, error: null, campaigns: updated }

      default:
         return state
   }

}
export default campaignsReducer