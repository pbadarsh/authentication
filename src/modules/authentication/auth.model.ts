import { createSchema, Type, typedModel, ExtractProps } from "ts-mongoose";

const collection = "auth-users";

const authSchema = createSchema({
  userName: Type.string({ required: true }),
  password: Type.string({ required: true })
});

export const authModel = typedModel(collection, authSchema);

export type AuthProps = ExtractProps<typeof authSchema>;
