export enum HTTPStatus {
    Ok = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    UnprocessableEntity = 422,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    InternalServerError = 500,
}

export enum ResponseMessages {
    Success = "Success",
    Failed = "Failed",
    BadRequest = "Bad Request",
    Ok = "OK",
}

export enum Messages {
    UserCreated = "User created successfully"
}

export enum ErrorMessages {
    ProductRequired = "Product is required",
    UserNotFound = "User is not found",
    EmailAndPasswordRequired = "Email and password are required",
    UserExists = "User is already exists"
}

export const APP_PRIVATE_KEY = "RellySecretPasswordToLoginIn"
