import logo from "./logo.svg";
import "./App.css";
import SelectGender from "./components/SelectGender";
import ThankYou from "./components/ThankYou";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Form from "./components/Form";
import Card from "./components/Card";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SelectGender} />
        <Route path="/card/:id/:fullname/:position/:branch/:motto/:gender/:picture"  component={Card}  />
        <Route path="/generate-card" component={Form} />
        <Route path="/thank-you" component={ThankYou} />
        {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
        {/* <Route component={SignIn} /> */}
      </Switch>
    </Router>
  );
}

export default App;
