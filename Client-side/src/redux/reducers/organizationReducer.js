import { GET_ALL_ORGANIZATION, CREATE_ORGANIZATION, DELETE_ORGANIZATION } from "../actions/actionTypes";

const initialState = {
    organization: []
}

const organizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ORGANIZATION:
            return {
                ...state,
                organization: action.payload
            }

        case CREATE_ORGANIZATION:
            return {
                ...state,
                organization: [
                    ...state.organization
                ]
            }
        case DELETE_ORGANIZATION:
            return {
                ...state,
                organization: [...state.organization]
            }
        default:
            return state;
    }
}
export default organizationReducer;