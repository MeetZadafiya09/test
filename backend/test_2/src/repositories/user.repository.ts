import db from "../models/index.js";
const User = db.users;

const findByEmail = async (email: string) => {
    return await User.findOne({ where: { email } });
}

const findById = async (id: string) => {
    return await User.findByPk(id);
}

export default {
    findByEmail,
    findById
}