import { createSchema, Type, typedModel } from 'ts-mongoose';

const collection = "auth-users"

const authSchema = createSchema({
    userName: Type.string({ required: true }),
    password: Type.string({ required: true })
})

export const authModel = typedModel(collection, authSchema)

