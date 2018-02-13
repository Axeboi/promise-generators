const run = require('./promiseRun')


//Utility functions returning promises
function getPromiseA() {
    return Promise.resolve('promiseA')
}

function getPromiseB() {
    return Promise.resolve('promiseB')
}

function getPromiseC () {
    return Promise.reject('promiseC')
}


//Main
function *main () {

    let resultA = yield getPromiseA()
    let resultB = yield getPromiseB()

    try {
        let resultC = yield getPromiseC()
        console.log(resultA + ' ' + resultB + ' ' + resultC)
    } catch (err) {
        console.log(err)
    }
    console.log(resultA + ' ' + resultB)
}


run(main)