import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string,
      secundary: string,

      gradientPrimary: string,
      gradientSecondary: string,

      green: string,
      red: string
    }
  }
}
