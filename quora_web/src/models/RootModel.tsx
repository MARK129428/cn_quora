import { createContext, useContext } from 'react';
import UserModel from './UserModel';

class RootModel {
  userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }
}

const rootModel = new RootModel();
const RootModelContext = createContext(rootModel);

export function RootModelProvider({ children } : {children: JSX.Element}) {
  return (
    <RootModelContext.Provider value={rootModel}>
      {children}
    </RootModelContext.Provider>
  );
}

export function useRootStore() {
  return useContext(RootModelContext);
}
