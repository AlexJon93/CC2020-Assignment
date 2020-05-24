import {} from '../action-types';

const initialState = {
    loading: true,
    group: {},
    events: []
}

const eventsReducer = (state=initialState, action) => {

    switch (action.type) {

        case SET_EVENTS:
            return {
                ...initialState,
                ...action.state            
            };

        case CLEAR_EVENTS:
            return initialState;

        case SET_WALL_GROUP:
            return {
                state,
                group: {
                    ...state.group,
                    ...action.group
                }
            };
    }
}