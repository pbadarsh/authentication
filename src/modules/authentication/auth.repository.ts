import { authModel, AuthProps } from "./auth.model";

export class AuthRepository {
    async find({ userName }): Promise<AuthProps> {
        return await authModel.findOne({ userName });
    }
    async save(auth) {
        return await new authModel(auth).save();
    }
}
