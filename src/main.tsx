import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/style.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools} from 'react-query/devtools';
import store from './redux/store.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 3600000
      }
    }
  })}>
    <Provider store = {store}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} position='bottom-left' />
    </Provider>
  </QueryClientProvider>,
)

