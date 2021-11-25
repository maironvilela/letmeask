import {useContext}  from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';

export function useTheme(){
  const value = useContext(ThemeContext)
  return value;
}

