const URL = 'http://localhost:3004/customers';

export const request = async(url, options) => {
    try {
        const response = await fetch(`${URL}${url}`, options);
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCustomers = () => request('/');

export const deleteCustomer = customerId => request(`/${customerId}`, {method: 'DELETE'});

export const saveCustomer = customer => request('/', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(customer),
});

export const updateCustomer = (customerId, updates) => request(`/${customerId}`, {
    method: 'PATCH',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(updates),
});
