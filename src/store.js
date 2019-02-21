import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./modules/index";
import logger from "redux-logger";

const REACT_APP_HOMEPAGE = process.env.REACT_APP_HOMEPAGE || "";

export const history = createBrowserHistory({
  basename: REACT_APP_HOMEPAGE || ""
});

const initialState = window.INITIAL_STATE || {};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history),
  store => next => action => {
    return next(action);
  }
];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
  middleware.push(logger);
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

let createStoreFunc = createStore;
const rootReducer = createRootReducer(history);

const store = createStoreFunc(rootReducer, initialState, composedEnhancers);

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./modules/index", () => {
      store.replaceReducer(rootReducer);
    });
  }
}

export default store;
