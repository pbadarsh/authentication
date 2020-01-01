import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const { SALT_ROUNDS, PRIVATE_KEY, ALGORITHM } = process.env;

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
      expiresIn: "1h",
      ...data
    },
    PRIVATE_KEY,
    { algorithm: ALGORITHM }
  );
};

export const validateJwt = async (jwtToken: string) => {
  return await jwt.verify(jwtToken, PRIVATE_KEY, { algorithms: [ALGORITHM] });
};
