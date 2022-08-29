import { Alert, Button } from '@mui/material';
import { Container } from './style.js';
import { ConnectionStatus } from './component/ConnectionStatus';
import { useCatFact } from './hook/useCatFact';
import { useSayHi } from './hook/useSayHi';

export const App = () => {

  const { catFact } = useCatFact();
  const { error, sayHi } = useSayHi();

  const sayHiClick = () => sayHi();

  return (
    <div style={{ textAlign: "center" }}>
      <Container>
        <div>
          <ConnectionStatus />
        </div>
        {catFact && <p style={{ margin: 16 }}>{catFact}</p>}
        <img src="./logo192.png" alt="App logo" />
        <Button color="secondary" style={{ margin: 16 }} onClick={sayHiClick} variant="contained">Say Hi</Button>
        {error && <Alert style={{ margin: 8 }} severity="error">{error}</Alert>}
      </Container>
    </div>
  );
};
