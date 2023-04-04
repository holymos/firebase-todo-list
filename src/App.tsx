import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from '@contexts/auth';
import { GlobalStyle } from '@styles/globals';
import theme from '@styles/theme';

import { Router } from './router';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <Router />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
