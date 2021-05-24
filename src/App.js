import logo from './logo.svg';
import './App.css';
import FileInputField from './components/FileInputField';
import { Container } from 'react-bootstrap';
import DataTable from './components/DataTable';

function App() {
  return (
    <Container className="mt-5 mb-5">
      <FileInputField />
      <DataTable />
    </Container>
  );
}

export default App;
