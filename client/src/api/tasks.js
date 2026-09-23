import axios from "axios";

const API = axios.create({ baseURL: "/api/tasks" });

export const getTasks = (filters = {}) => API.get("/", { params: filters });
export const getTask = (id) => API.get(`/${id}`);
export const createTask = (data) => API.post("/", data);
export const updateTask = (id, data) => API.put(`/${id}`, data);
export const deleteTask = (id) => API.delete(`/${id}`);
