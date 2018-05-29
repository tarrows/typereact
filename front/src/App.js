import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { auth } from "./actions"
import typeApp from "./reducers";

import TypeReact from "./components/TypeReact";
import NotFound from "./components/NotFound";
import Login from "./components/Login";

let store = createStore(typeApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

  componentDidMount() {
    this.props.loadUser();
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>
      } else if (!this.props.auth.isAuthenticated) {
        return <Ridirect to="/login" />
      } else {
        return <ChildComponent />
      }
    }} />
  }

  render() {
    let { PrivateRoute } = this;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TypeReact} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}
