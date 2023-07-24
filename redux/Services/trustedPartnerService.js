import api from "../api";
import { authHeader } from "../authHeader";

export const trustedpartnersService = {
    getTrustedPartners,
    createTrustedPartner,
    updateTrustedPartner,
    deleteTrustedPartner,
    getSingleTrustedPartner
};

async function getTrustedPartners(data) {

    return await api.get(`trustedpartners/?page=${data?.pagination?.page || 1}&page_size=${data?.pagination?.pageSize || 300000000000}`, {
        headers: authHeader(),
    });
}
async function getSingleTrustedPartner(id) {

    return await api.get(`trustedpartners/${id}`, {
        headers: authHeader(),
    });
}

async function createTrustedPartner(trustedpartnersData) {
    return await api.post(`trustedpartners/create`, trustedpartnersData, {
        headers: authHeader(),
    });
}

async function updateTrustedPartner({ id, data }) {
    return await api.patch(`trustedpartners/update?trusted_partner_id=${id}`, data, {
        headers: authHeader(),
    });
}

async function deleteTrustedPartner(ID) {
    return await api.delete(`trustedpartners/?trusted_partner_id=${ID}`, {
        headers: authHeader(),
    });
}
