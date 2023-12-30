import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/style.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools} from 'react-query/devtools';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 3600000
      }
    }
  })}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} position='bottom-left' />
  </QueryClientProvider>,
)

