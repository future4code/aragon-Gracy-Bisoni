import { Request, Response } from "express"
import connection from "../database/connection"
import { TABLE_PRODUCTS, TABLE_PURCHASES, TABLE_USERS } from "../database/tableNames"
import { UserDatabase } from "../database/UserDatabase"
import { ProductDatabase } from "../database/ProductDatabase"

export const getUserPurchases = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = req.params.id

        const [result] = await connection.raw(`
        SELECT
            ${UserDatabase.TABLE_USERS}.email,
            ${ProductDatabase.TABLE_PRODUCTS}.name AS product_name,
            ${ProductDatabase.TABLE_PRODUCTS}.price AS product_price,
            ${TABLE_PURCHASES}.quantity AS product_quantity,
            ${TABLE_PURCHASES}.total_price
        FROM ${TABLE_PURCHASES}
        JOIN ${UserDatabase.TABLE_USERS}
        ON ${TABLE_PURCHASES}.user_id = ${UserDatabase.TABLE_USERS}.id
        JOIN ${ProductDatabase.TABLE_PRODUCTS}
        ON ${TABLE_PURCHASES}.product_id = ${ProductDatabase.TABLE_PRODUCTS}.id
        WHERE ${TABLE_PURCHASES}.user_id = ${id};
        `)

        res.status(200).send({ purchases: result })
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}