import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';

const getUsers = () => {
    return axios.get('/users').then( ({data: {users}}) => users );
}

const createUser = (user) => {
    return axios.post('/users', user);
}

const updateUser = (id, user) => {
    return axios.put(`/users/${id}`, user);
}

const deleteUser = (id) => {
    return axios.delete(`/users/${id}`).then(({data}) => !!data.deleted);
}

export {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}