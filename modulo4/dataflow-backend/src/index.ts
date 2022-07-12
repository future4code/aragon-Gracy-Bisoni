import express, { Request, Response } from 'express'
import cors from 'cors'
import { products, Product } from './data'
import { userInfo } from 'os'
import { resolveSoa } from 'dns'

const app = express()
app.use(cors())
app.use(express.json())

// Exercício 1
app.get('/test', (req: Request, res: Response) => {
    try {
        res.status(200).send('API OK!')
    } catch (error) {
        res.status(400).send('Error, try again')
    }
})

// Exercício 2 -> ok!

// Exercício 3
app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send({
            message: 'Success',
            products: products
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// Exercício 4
app.post('/products', (req: Request, res: Response) => {
    try {
        const { name, price } = req.body
        if (name !== undefined && price !== undefined) {

            if (typeof name !== "string" || typeof price !== "number") {
                throw new Error("Error! Invalid ID type");

            } else if (price <= 0) {
                throw new Error("Error! Price must be greater than zero");

            } else {
                const lastProduct = products[products.length - 1]
                const newProduct: Product = {
                    name: name,
                    id: lastProduct.id + 1,
                    price: price,
                }
                products.push(newProduct)

                res.status(201).send({
                    message: 'Success',
                    productList: products
                })
            }
        } else {
            throw new Error("Error! Insert a name and price on the body of request")
        }

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

// Exercício 5
app.put('/products/:id', (req: Request, res: Response) => {
    try {
        const productId = Number(req.params.id)
        const { price } = req.body

        const index = products.findIndex((product) => {
            return product.id === productId
        })
        if (index === -1) {
            throw new Error("Product not found");
        }

        if (!price || price <= 0) {
            throw new Error("Missing price on body of the request, price needs to be greater than zero");
        } else if (typeof price !== "number") {
            throw new Error("Price type needs to be a number");
        } else {
            const newPrice = products.map((product) => {
                if (product.id === productId) {
                    product.price = price
                    return product
                }
            })
            res.status(200).send({
                message: 'Product price was updated!',
                product: newPrice[productId - 1],
                productList: products
            })
        }

    } catch (error: any) {
        switch (error.message) {
            case 'Missing price on body of the request, price needs to be greater than zero':
                res.status(422)
            case 'Product not found':
                res.status(404)
            default:
                res.status(500)
        }
        res.send(error.message || "Unexpected error")
    }
})

// Exercício 6
app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const productId = Number(req.params.id)
        const index = products.findIndex((product) => {
            return product.id === productId
        })
        if (index === -1) {
            throw new Error("Product not found");
        } else {
            const editList = products.map((product)=> {
                if(product.id !== productId){
                    return product
                } 
            })
            res.status(200).send({
                message: 'Product was deleted',
                products: editList
            })    
        }
    } catch (error: any) {
        switch (error.message) {
            case 'Product not found':
                res.status(404)
            default:
                res.status(500)
        }
        res.send(error.message || "Unexpected error")
    }
})


app.listen(3003, () => console.log('Server on port 3003'))
