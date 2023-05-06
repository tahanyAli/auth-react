import { useState, useEffect } from "react";
import { When } from "react-if";
import News from "./components/News";
import Sign from "./components/Sign";
import cookies from 'react-cookies';
function App() {
  const [loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    const token = cookies.load('token');
    if(token) {
      setLoggedin(true);
    }
    console.log(token);
  }, []);
  const logout = () => {
    cookies.remove('token');
    setLoggedin(false);
  }
  return (
    <div className="App">
      <When condition={!loggedin}>
        <Sign setLoggedin={setLoggedin} />
      </When>
      <When condition={loggedin}>
      <button onClick={logout}>logout</button>
        <News />
      </When>
    </div>
  );
}

export default App;
