import api from "../api";
import { authHeader } from "../authHeader";

export const membershipService = {
    getMemberships,
    createMembership,
    updateMembership,
    deleteMembership,
    getSingleMembership,
};

async function getMemberships(data) {

    return await api.get(`/membership/?page=${data?.pagination?.page || 1}&page_size=${data?.pagination?.pageSize || 300000000000}`, {
        headers: authHeader(),
    });
    //     return await api.get(`membership/`, {
    //         headers: authHeader(),
    //     });
}
async function getSingleMembership(id) {


    return await api.get(`membership/${id}`, {
        headers: authHeader(),
    });
}
async function createMembership(membershipData) {
    return await api.post(`/membership/create`, membershipData, {
        headers: authHeader(),
    });
}

async function updateMembership({ id, data }) {
    return await api.patch(`/membership/update?member_id=${id}`, data, {
        headers: authHeader(),
    });
}

async function deleteMembership(ID) {
    return await api.delete(`/membership/delete?member_id=${ID}`, {
        headers: authHeader(),
    });
}
