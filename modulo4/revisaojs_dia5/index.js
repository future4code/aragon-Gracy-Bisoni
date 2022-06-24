const validateInput = (input) => {
    let isError = false
    let errors = []
    let keys = Object.keys(input)
    
    keys.forEach((key) => {
        if(input[`${key}`] === undefined) {
            isError = true
            errors.push(key)
        }
    })

    const output = {isError: isError, errors: errors}

    return output
}

console.log(validateInput({ id: 1, name: undefined, email: undefined }))
console.log(validateInput({ id: 1, name: "astrodev", email: "astrodev@gmail.com" }))
console.log(validateInput({ }))
