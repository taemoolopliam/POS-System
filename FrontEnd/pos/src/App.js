import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateLayout from "./layouts/PrivateLayout";
import MainShop from "./views/shop/MainShop";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route>
          <PrivateLayout>
            <Switch>
              <Route path="/" exact component={MainShop} />
              <Route path="/shop" component={MainShop} />
            </Switch>
          </PrivateLayout>
        </Route>
      </Switch>
    </Router>
  );
}
