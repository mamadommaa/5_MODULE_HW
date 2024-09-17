
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";

import './styles.css'


export const App = () => {
  return (
    <div className="app">
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;