import { config } from 'dotenv'
config()
import { Query, expressErrorHandler, attachFinishMethod, ExpressResponse } from 'express-methods'
import { IsString } from 'class-validator'
import express from 'express'
import morgan from 'morgan'
const { log } = console;
const { PORT, MONGODB_URL } = process.env;
const app = express()

app.listen(PORT, () => log("server on : ", PORT));

class Check {
    @IsString()
    id: string
}

app.use(attachFinishMethod)

app.use(morgan('combined'))

app.get('/', Query(Check), (req, res: ExpressResponse) => {
    res.finish({ msg: 'done' })
})

app.use(expressErrorHandler)