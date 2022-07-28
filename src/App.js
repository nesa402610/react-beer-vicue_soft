import './App.css';
import Main from "./components/main";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BeerView from "./components/beerView";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Main/>} />
                    <Route path={':beer'} element={<BeerView/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
