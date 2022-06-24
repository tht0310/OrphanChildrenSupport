import { IRegisterModel } from '@Models/ILoginModel';

import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { ILoginModel } from '@Models/ILoginModel';
import AccountService from '@Services/AccountService';
import { message } from 'antd';
import { Redirect } from 'react-router-dom';

// Declare an interface of the store's state.
export interface ILoginStoreState {
    isFetching: boolean;
    isLoginSuccess: boolean;
    currentUser: IRegisterModel;
}


// Create the slice.
const slice = createSlice({
    name: "login",
    initialState: {
        isFetching: false,
        isLoginSuccess: false,
        currentUser:null
    } as ILoginStoreState,
    reducers: {
        setFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload;
        },
        setSuccess: (state, action: PayloadAction<boolean>) => {
            state.isLoginSuccess = action.payload;
        },
        setCurrentUser: (state, action: PayloadAction<IRegisterModel>) => {
            state.currentUser = action.payload;
        }
    }
});

// Export reducer from the slice.
export const { reducer } = slice;

// Define action creators.
export const actionCreators = {
    login: (model: ILoginModel) => async (dispatch: Dispatch) => {
     
        dispatch(slice.actions.setFetching(true));

        const service = new AccountService();

        const result = await service.login(model);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
            dispatch(slice.actions.setCurrentUser(result.value));
            window.location.replace("");
            
        } else {
            message.error("Username or password is incorrect")
            dispatch(slice.actions.setCurrentUser(null));
        }

        dispatch(slice.actions.setFetching(false));
    },

 
};
