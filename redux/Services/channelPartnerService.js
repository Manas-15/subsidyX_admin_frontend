import api from "../api";

export const channelpartnersService = {
    getChannelPartners,
    createChannelPartner,
    updateChannelPartner,
    deleteChannelPartner,
    getSingleChannelPartner
};

async function getChannelPartners(data) {

    return await api.get(`channelpartners/?page=${data?.pagination?.page || 1}&page_size=${data?.pagination?.pageSize || 300000000000}`, {
        // headers: authHeader(),
    });
}
async function getSingleChannelPartner(id) {

    return await api.get(`channelpartners/${id}`, {
        // headers: authHeader(),
    });
}

async function createChannelPartner(channelpartnersData) {
    return await api.post(`channelpartners/create`, channelpartnersData, {
        // headers: authHeader(),
    });
}

async function updateChannelPartner({ id, data }) {
    return await api.patch(`channelpartners/update?channel_partner_id=${id}`, data, {
        // headers: authHeader(),
    });
}

async function deleteChannelPartner(ID) {
    return await api.delete(`channelpartners/?channel_partner_id=${ID}`, {
        // headers: authHeader(),
    });
}
