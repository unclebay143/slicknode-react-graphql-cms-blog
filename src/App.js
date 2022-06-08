import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { SinglePost } from "./pages/single-post/SinglePost";
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:slug' element={<SinglePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
