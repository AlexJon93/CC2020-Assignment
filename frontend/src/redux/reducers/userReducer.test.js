import userReducer from "./userReducer";

const blankState = {
    MemberID: null,
    Email: null,
    Username: null,
    groups: [],
    loading: true
} 

const filledState = {
    MemberID: 1,
    Email: "test@gmail.com",
    Username: "test",
    groups: [
        {
            GroupID: 1,
            GroupName: "Cool Group"
        },
        {
            GroupID: 2,
            GroupName: "That One Group"
        }
    ],
    loading: true
};


test("Do nothing on irrelevant action", () => {
    const action = {
        type: "DO_SOMETHING"
    };

    expect(userReducer(filledState, action)).toEqual(filledState);
});


test("Set user for only one field on a blank state", () => {
    const email = "test@gmail.com";
    const action = {
        type: "SET_USER",
        user: {
            Email: email
        } 
    }

    const expected = {
        ...blankState,
        Email: email
    };
    expect(userReducer(blankState, action)).toEqual(expected);
});


test("Set user for only one field on non-blank state", () => {
    const username = "Grego";

    const action = {
        type: "SET_USER",
        user: {
            Username: username 
        }
    }

    const expected = {
        ...filledState,
        Username: username
    };

    expect(userReducer(filledState, action)).toEqual(expected);
});


test("Clear user details", () => {
    const action = {
        type: "CLEAR_USER"
    }
    
    expect(userReducer(filledState, action)).toEqual(blankState);
});

test("Add a group", () => {
    const action = {
        type: "ADD_USER_GROUP",
        group: {GroupID: 3, GroupName: "Lame Group"}
    };

    const expected = {
        ...filledState,
        groups: [
            ...filledState.groups,
            action.group
        ]
    };
    expect(userReducer(filledState,action)).toEqual(expected);
})

test("Add a group that exists does nothing", () => {
    const action = {
        type: "ADD_USER_GROUP",
        group: {
            GroupID: 1,
            GroupName: "Cool Group"
        }
    };
    
    expect(userReducer(filledState,action)).toEqual(filledState);
})