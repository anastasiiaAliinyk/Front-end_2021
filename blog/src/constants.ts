import { lightTheme } from './styles/theme/lightTheme';
import { darkTheme } from './styles/theme/darkTheme';
import { CustomTheme } from './types';

export const themes: Record<string, CustomTheme> = {
    light: lightTheme,
    dark: darkTheme
};

export const animationTime = '0.3s';
export const textColorOnHover = '#2b2a2a';
export const secondaryColorText = 'rgb(76, 175, 80)'

export const baseURL = 'https://conduit.productionready.io'
