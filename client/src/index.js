import { render } from "react-dom";
import ReactDOM from 'react-dom/client';
import { 
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import App from "./App";

import UserProvider from "./context/UserProvider";
import IssueProvider from "./context/IssueProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <IssueProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </IssueProvider>
    </BrowserRouter>
);