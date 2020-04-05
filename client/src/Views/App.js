import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import Home from "./Home/Home";
import Landing from "./Landing/Landing";
import GmailAuthResultDialog from "Views/GmailAuth/GmailAuthResultDialog";
import GmailSignInDialog from "Views/GmailAuth/GmailSignInDialog";
import theme from "Assets/styles/Theme";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path={["/", "/login", "/register"]} component={Landing} />
          </Switch>
          <Route path={`*/email-auth-dialog`} component={GmailSignInDialog} />
          <Route
            path={`*/email-auth-results-dialog`}
            component={GmailAuthResultDialog}
          />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
