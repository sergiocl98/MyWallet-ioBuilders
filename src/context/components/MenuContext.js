import { createContext } from 'react';

export const MenuContext = createContext({
  menuItemSelected: 0,
  changeItemSelected: () => {}
});