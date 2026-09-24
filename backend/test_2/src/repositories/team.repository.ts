import { SOFT_DELETE_TYPE, SoftDeleteType } from "../lib/constants.js";
import db from "../models/index.js";
const Team = db.teams;

const create = async (data: any) => {
    return await Team.create(data);
}

const findAll = async () => {
    return await Team.findAll({
        order: [['created_at', 'DESC']]
    });
}

const updateById = async (id: string, data: any) => {
    return await Team.update(data, { where: { id } });
}

const findByIdWithDeleted = async (id: string) => {
    return await Team.findByPk(id, { paranoid: false });
}

const findById = async (id: string) => {
    return await Team.findByPk(id);
}

const deleteById = async (id: string, type: SoftDeleteType) => {
    return await Team.destroy({ where: { id }, ...(type === SOFT_DELETE_TYPE.HARD ? { force: true } : {}) });
}

const restoreById = async (id: string) => {
    return await Team.restore({ where: { id } });
}   

export default { create, findAll, updateById, findByIdWithDeleted, findById, deleteById, restoreById };