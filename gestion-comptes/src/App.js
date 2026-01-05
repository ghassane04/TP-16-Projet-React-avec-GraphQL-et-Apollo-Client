import { client, ApolloProvider } from "./apollo/client";
import CompteList from "./components/CompteList";
import CreateCompte from "./components/CreateCompte";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 flex items-center justify-center">
            <svg
              className="w-10 h-10 mr-3 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Gestion des Comptes et Transactions
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <CreateCompte />
              <CompteList />
            </div>
            <div className="space-y-6">
              <TransactionForm />
              <TransactionList />
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
