import { authModel, AuthProps, loggedInModel, LoggedInProps } from "./auth.model";

export class AuthRepository {
    async find({ userName }): Promise<AuthProps> {
        return await authModel.findOne({ userName });
    }
    async save(auth) {
        return await new authModel(auth).save();
    }
}


export class LoggedInRepository {
    async findAll({ userId }): Promise<LoggedInProps[]> {
        return await loggedInModel.find({ userId });
    }
    async save(loggedInPayload): Promise<LoggedInProps> {
        return await new loggedInModel(loggedInPayload).save();
    }
}