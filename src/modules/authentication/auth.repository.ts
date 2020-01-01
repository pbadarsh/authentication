import { authModel } from "./auth.model";

export class AuthRepository {
    async find(auth) {
        return await authModel.findOne(auth);
    }
    async save(auth) {
        return await new authModel(auth).save();
    }
}
