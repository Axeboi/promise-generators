/*
module.exports = function run(gen, ...args) {
    let it = gen(...args)

    return Promise.resolve()
                  .then( function handleNext (value) {
                      let next = it.next(value)
                      return ( function handleResult (next) {
                          if (next.done) {
                              return next.value
                          } else {
                              return Promise.resolve ( next.value )
                                            .then(handleNext,
                                                  err => {
                                                       Promise.resolve( it.throw(err) )
                                                                    .then(handleResult)
                                                  })
                          }
                      })(next)  
                  })
}
*/

module.exports = function run(gen, ...args) {
    var it = gen(...args)

    return Promise.resolve()
                  .then(handleNext)

    function handleNext (value) {
        let next = it.next(value)
        return handleResult(next)
    }

    function handleResult (next) {
        if (next.done) {
            return next.value
        } else {
            return Promise.resolve( next.value )
                          .then(handleNext,
                                err => {
                                    Promise.resolve( it.throw(err))
                                           .then(handleResult)
                                }) 
        }
    }


                  
}




