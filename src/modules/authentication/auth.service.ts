import { ExpressResponse } from "express-methods"

export class AuthService {
    async login(req, res: ExpressResponse, next) {
        try {
            res.finish({ auth: true })
        } catch (error) {
            next(error)
        }
    }
    
}