import "./App.css"
import { Route, Router } from "@solidjs/router";
import SignInPage from "./routes/signIn";
import Display from "./routes/display";

export default function App() {
  return (
    <Router>
      <Route path="/" component={Display} />
    </Router>
  );
}
