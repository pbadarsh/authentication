import { client } from './../../common/redis.util';
import { authModel, AuthProps, loggedInModel, LoggedInProps } from "./auth.model";
import { userDTO } from './auth.dto';

export class AuthRepository {
    async find({ userName = "", userId = "" }): Promise<AuthProps> {
        if (userId) {
            return await authModel.findOne({ _id: userId }).lean()
        }
        return await authModel.findOne({ userName }).lean()
    }

    async findAll(): Promise<AuthProps[]> {
        return await authModel.find();
    }

    async save(auth) {
        return await new authModel(auth).save();
    }
}

export class LoggedInRepository {
    async findAll({ userId } : userDTO): Promise<LoggedInProps[]> {
        return await loggedInModel.find({ userId });
    }
    async save(loggedInPayload): Promise<LoggedInProps> {
        return await new loggedInModel(loggedInPayload).save();
    }
}


export class LogoutRepository {
    async add(jwt) {
        return await client.set(jwt, jwt, "EX", 3600)
    }
    async get(jwt) {
        return new Promise((resolve, reject) => {
            client.get(jwt, (err, replay) => {
                if (err) {
                    reject(err)
                }
                resolve(replay)
            })
        })

    }
}