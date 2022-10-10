import { render } from "react-dom";
import ReactDOM from 'react-dom/client';
import { 
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import App from "./App";
import Expenses from "./routes/Expenses";
import Invoices from "./routes/Invoices";
import UserProvider from "./context/UserProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>
);