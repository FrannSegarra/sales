import ClientsList from './components/Clients/ClientsList';
import ProspectsList from './components/Clients/ProspectsList ';
import Layout from './components/Layout/Layout';
import ClientProvider from './store/ClientProvider';

function App() {
  return (
    <ClientProvider>
      <Layout>
        <ClientsList/>
        <ProspectsList/>
      </Layout>
    </ClientProvider>
  );
}

export default App;
