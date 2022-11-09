import Router from './routes/Router';
import GlobalState from './global/GlobalState';
import { Body } from './styledApp';

function App() {
  return (
    <Body>
      <GlobalState>
        <Router />
      </GlobalState>
    </Body>
  );
}

export default App;
