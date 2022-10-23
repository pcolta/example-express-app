import {User} from "../db/models/User";

const findByEmail = async (email: string) => {
    return await User.findByPk(email);
}

const createUser = async (params: Partial<User>) => {
    const user = await User.create({
        ...params,
    });
    return user.save();
};

export { findByEmail, createUser };
