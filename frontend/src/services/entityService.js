import api from "./api";

export const getAll = async (entity) => {
    const response = await api.get(`/${entity}/ver`); 
    return response.data; 
} 

export const create = async (entity, data) => { 
  const response = await api.post(`/${entity}/crear`, data); 
  return response.data; 
}; 

export const update = async (entity, id, data) => { 
  const response = await api.put(`/${entity}/actualizar/${id}`, data); 
  return response.data; 
}; 

export const remove = async (entity, id) => { 
  const response = await api.delete(`/${entity}/eliminar/${id}`); 
  return response.data; 
};