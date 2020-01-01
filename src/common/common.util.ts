import { Unauthorized } from 'http-errors';
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRepository } from "../modules/authentication/auth.repository";
import { Roles } from "../modules/authentication/auth.model";

const { SALT_ROUNDS, PRIVATE_KEY, ALGORITHM, EXPIRES_IN } = process.env;

const Auth = new AuthRepository()

export const hashPassword = async (password: string) => {
  return await hash(password, +SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await compare(password, hashedPassword);
};

export const createJwt = async (data: object) => {
  return await jwt.sign(
    {
      expiresIn: EXPIRES_IN,
      ...data
    },
    PRIVATE_KEY,
    { algorithm: ALGORITHM }
  );
};

export const validateJwt = async (jwtToken: string) => {
  return await jwt.verify(jwtToken, PRIVATE_KEY, { algorithms: [ALGORITHM] });
};

export const isAdmin = async (query) => {
  const result = await Auth.find(query)
  if (!result) {
    return false
  }

  if (result.role === Roles.USER) {
    return false
  }
  return true
}