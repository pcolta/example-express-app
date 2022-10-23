import {Product} from "../db/models/Product";

const MAXIMUM_FETCH_LIMIT = 100;

const getProducts = async (limit: number, offset: number) => {
    limit = Math.min(limit, MAXIMUM_FETCH_LIMIT);
    return await Product.findAll({
        limit,
        offset,
    });
};

const getProductById = async (id: number) => {
    return await Product.findByPk(id)
};

const addProduct = async (params: Partial<Product>) => {
    const product = await Product.create({
        ...params,
    });
    return product.save();
};

const modifyProduct = async (id: number, params: Partial<Product>) => {
    await Product.update(params, {
        where: {
            id,
        },
    })
    return await Product.findByPk(id);
};

const softDeleteProduct = async (id: number) => {
    await Product.update({
        deleted: true,
    }, {
        where: {
            id,
        },
    });
    return await Product.findByPk(id)
}

export { getProducts, getProductById, addProduct, modifyProduct, softDeleteProduct };
