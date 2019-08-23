import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { getMostProduct } from 'services/behavior'
import { getHours } from 'services/suggest'
import { loadProfile } from 'services/user'
import actions from './actions'
import * as selectors from './selectors'

export function* LOAD_CURRENT_ACCOUNT() {
    yield put({
        type: 'suggest/SET_STATE',
        payload: {
            loading: true,
        },
    })
    const response = yield call(loadProfile)
    if (response) {
        yield put({
            type: 'suggest/SET_STATE',
            payload: {
                name: response.user.name,
                email: response.user.email,
                shopName: response.name_shop,
                shopUrl: response.shop_url,
                role: 'admin',
                authorized: true,
            },
        })
        yield put({
            type: 'suggest/LOAD_SUGGEST',
        })
    }
    yield put({
        type: 'suggest/SET_STATE',
        payload: {
            loading: false,
        },
    })
}
export function* LOAD_SUGGEST() {
    const shopUrl = yield select(selectors.shopUrl);
    const products = yield call(getMostProduct, shopUrl);
    const hoursList = yield call(getHours, shopUrl);
    const mostProduct = []
    const lessProduct = []
    const hours = []
    if (hoursList.length >= 10){
        for (let index = 0; index < 10; index++) {
            hours.push(hoursList[index])
        }
    }
    if (hoursList.length < 10){
        hoursList.forEach(element => {
            hours.push(element)
        });
    }
    if (products.length >= 10) {
        /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

        for (let index = 0; index < 10; index++) {
            mostProduct.push(products[index])
        }
        for (let index = products.length - 1; index > products.length - 1 - 10; index--) {
            lessProduct.push(products[index])
        }
    }
    if (products.length < 10) {
        /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

        for (let index = 0; index < products; index++) {
            mostProduct.push(products[index])
        }
        for (let index = products.length - 1; index >= 0; index--) {
            lessProduct.push(products[index])
        }
    }
    console.log(mostProduct)
    console.log(lessProduct)

    yield put({
        type: 'suggest/SET_STATE',
        payload: {
            mostProduct,
            lessProduct,
            hours
        },
    })
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.LOAD_SUGGEST, LOAD_SUGGEST),
        takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
        LOAD_CURRENT_ACCOUNT(),
    ])
}


