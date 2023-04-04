import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    colors: {
      primary: string;

      error: string;

      gray300: string;
      gray500: string;
      gray900: string;
    };
  }
}
