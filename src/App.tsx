import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Routes';
import { ThemeProvider } from './contexts/ThemeContext';
import { SelectedItemProvider } from './contexts/SelectedMarketContext';

import './i18n/i18n';

function App() {
  return (
    <SelectedItemProvider>
      <ThemeProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </SelectedItemProvider>
  );
}

export default App;
