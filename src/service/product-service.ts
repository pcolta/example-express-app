import {
    getProducts,
    addProduct,
    getProductById,
    modifyProduct,
    softDeleteProduct
} from "../repository/product-repository";
import {Request, Response} from 'express';
import {HTTPStatus, ErrorMessages} from "../utils/constants";
import {successResponseWrapper, failureResponseWrapper} from "../utils/shared";

interface Query {
    limit: string,
    offset: string
}

const listProducts = async (req: Request, res: Response) => {
    const {limit, offset} = req?.query as unknown as Query;
    const limitValue = parseInt(limit, 10) || 10;
    const offsetValue = parseInt(offset, 10) || 0;
    const products = await getProducts(limitValue, offsetValue);
    return res.status(HTTPStatus.Ok).json(
        successResponseWrapper({count: products?.length, limitValue, offset, products})
    )
}

const getProduct = async (req: Request, res: Response) => {
    const productId = parseInt( req.params.id as string, 10) || undefined;
    if (!productId) {
        throw new Error("Invalid product id");
    }
    const product = await getProductById(productId);
    return res.status(HTTPStatus.Ok).json(
        successResponseWrapper({product})
    )
}

const createProduct = async (req: Request, res: Response) => {
    const product = req?.body;
    if (!product) {
        return res.status(HTTPStatus.UnprocessableEntity).send(
            failureResponseWrapper({
                message: ErrorMessages.ProductRequired
            })
        )
    }
    const addPro = await addProduct(product);
    return res.status(HTTPStatus.Created).json(
        successResponseWrapper({
            product: addPro
        })
    )
};

const updateProduct = async (req: Request, res: Response) => {
    const product = req?.body;
    const productId = parseInt(req.params.id as string, 10) || undefined;
    if (!product || !productId) {
        return res.status(HTTPStatus.UnprocessableEntity).send(
            failureResponseWrapper({message: ErrorMessages.ProductRequired})
        )
    }
    const modifiedProduct = await modifyProduct(productId, product);
    return res.status(HTTPStatus.Created).json(
        successResponseWrapper({
            product: modifiedProduct
        })
    )
}

const deleteProduct = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id as string, 10) || undefined;
    if (!productId) {
        return res.status(HTTPStatus.UnprocessableEntity).send(
            failureResponseWrapper({message: ErrorMessages.ProductRequired})
        )
    }
    const deleteProduct = await softDeleteProduct(productId);
    return res.status(HTTPStatus.Created).json(
        successResponseWrapper({
            product: deleteProduct
        })
    )
}

export {listProducts, getProduct, createProduct, updateProduct, deleteProduct}
