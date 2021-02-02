import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { loadAuthsSuccess } from './auth.actions';

export const authStateFeatureKey = 'authState';

export interface AuthState {
userLogged:any,
}

export const authInitialState:AuthState={
  userLogged:null,
}

export const reducers=createReducer(authInitialState, on(loadAuthsSuccess, (state, action) => {
  return {
    userLogged:action.data
  }
}));

export const AuthSelector = createFeatureSelector<AuthState>(authStateFeatureKey);
export const userLoggedDetails = createSelector(
  AuthSelector,
  (state:AuthState) => state.userLogged
)


export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];
