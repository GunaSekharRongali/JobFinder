const initialState = {
    appliedJobs: [],
};

const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_APPLIED_JOB':
            return {
                ...state,
                appliedJobs: [...state.appliedJobs, action.payload],
            };
        default:
            return state;
    }
};

export default jobReducer;