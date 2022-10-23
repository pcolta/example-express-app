import {
    findByEmail,
    createUser
} from "../repository/user-repository"
import {Request, Response} from 'express';
import {HTTPStatus, ErrorMessages, Messages} from "../utils/constants";
import {successResponseWrapper, failureResponseWrapper} from "../utils/shared";
import {generateToken, hashPassword, verifyPassword} from "../utils/password-utils";

const login = async (req: Request, res: Response) => {
    const userEmail = req?.body?.email?.toLowerCase();
    const password = req?.body?.password;

    if (!userEmail || !password) {
        return res.status(HTTPStatus.Unauthorized).send(
            failureResponseWrapper({
                message: ErrorMessages.UserNotFound
            })
        )
    }

    const existing = await findByEmail(userEmail);
    if (!existing) {
        return res.status(HTTPStatus.Unauthorized).send(
            failureResponseWrapper({
                message: ErrorMessages.UserNotFound
            })
        )
    }

    if (verifyPassword(password, existing.passwordHash)) {
        return res.status(HTTPStatus.Ok).json(
            successResponseWrapper({
                user: {
                    email: existing.email,
                },
                accessToken: generateToken(existing.email)
            })
        )
    } else {
        return res.status(HTTPStatus.Unauthorized).send(
            failureResponseWrapper({
                message: ErrorMessages.UserNotFound
            })
        )
    }
}

const signup = async (req: Request, res: Response) => {
    const userEmail = req?.body?.email?.toLowerCase();
    const password = req?.body?.password;

    if (!userEmail || !password) {
        return res.status(HTTPStatus.BadRequest).send(
            failureResponseWrapper({
                message: ErrorMessages.EmailAndPasswordRequired
            })
        )
    }

    const existing = await findByEmail(userEmail);
    if (existing) {
        return res.status(HTTPStatus.Conflict).send(
            failureResponseWrapper({
                message: ErrorMessages.UserExists
            })
        )
    }

    const user = await createUser({
        email: userEmail,
        passwordHash: hashPassword(req.body.password),
    });

    return res.status(HTTPStatus.Ok).json(
        successResponseWrapper({
            message: Messages.UserCreated,
            accessToken: generateToken(userEmail),
        })
    )
}

export { login, signup }
