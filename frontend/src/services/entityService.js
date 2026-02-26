import api from "./api";

export const getAll = async (entity) => { const response = await api.get(`/${entity}`)}; 
export const create = async (entity, data) => { const response = await api.post(`/${entity}`, data)}; 
export const update = async (entity, id, data) => { const response = await api.put(`/${entity}/${id}`, data)}; 
export const remove = async (entity, id) => { const response = await api.delete(`/${entity}/${id}`)};