function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'timeout!')
    })
}

timeout(2000).then((msg) => console.log(msg))