import { createSchema, Type, typedModel, ExtractProps } from "ts-mongoose";

export enum Roles {
  USER = "user",
  ADMIN = "admin"
}

const authCollection = "auth-users";
const loggedInCollection = "logged-in-devices";
const authSchema = createSchema({
  userName: Type.string({ required: true }),
  password: Type.string({ required: true }),
  role: Type.string({ default: Roles.USER }),
  mobileNumber: Type.string({ required: false }),
  emailAddress: Type.string({ required: false })
});

const loggedInDeviceSchema = createSchema(
  {
    userId: Type.objectId({ required: true }),
    token: Type.string({ required: true }),

    isMobile: Type.boolean(),
    isDesktop: Type.boolean(),
    browser: Type.string(),
    version: Type.string(),
    os: Type.string(),
    platform: Type.string(),
    source: Type.string()
  },
  { timestamps: true }
);

export const authModel = typedModel(authCollection, authSchema);
export const loggedInModel = typedModel(
  loggedInCollection,
  loggedInDeviceSchema
);

export type AuthProps = ExtractProps<typeof authSchema>;
export type LoggedInProps = ExtractProps<typeof loggedInDeviceSchema>;
