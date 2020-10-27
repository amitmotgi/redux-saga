import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  vaultGet: ['userInfo'],
  vaultUpdate: ['userInfo']
});

export const VaultTypes = Types;
export default Creators;
