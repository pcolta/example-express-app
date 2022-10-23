import { ResponseMessages } from "../utils/constants";

export const successResponseWrapper = (data: any) => {
    return {
        status: ResponseMessages.Success,
        ...data,
    };
};

export const failureResponseWrapper = (data: any) => {
    return {
        status: ResponseMessages.Failed,
        ...data,
    };
};
