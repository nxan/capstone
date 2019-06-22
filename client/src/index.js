import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createHashHistory } from 'history'

import './global.scss'

const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routeMiddleware(history);
const middlewares = [thunk, sagaMiddleware, routeMiddleware]
if (process.env.NODE_ENV === 'development' && true) {
    middlewares.push(logger)
}

const store = createStore(reducers(history), compose(applyMiddleware(...middlewares)))
sagaMiddleware.run(sagas)

ReactDOM.render(
    <Provider store={store}>
        <Localization>
            <Router history={history} />
        </Localization>
    </Provider>,
    document.getElementById('root'),
)

serviceWorker.register()
export { store, history }