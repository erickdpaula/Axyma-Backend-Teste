import { Schema } from '../../models/Schema'

export const Validation = (produto) => {
    const { Error } = Schema.validate(produto)

    console.log(Error)
}