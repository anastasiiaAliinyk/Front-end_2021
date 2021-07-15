const URL = "http://localhost:3004/customers";

export const request = async(url, options) => {
    const response = await fetch(`${URL}${url}`, options);

    if (!response.ok) {
        throw new Error("Failed to load data");
    }

    return response.json();
};

export const getCustomers = () => request('/').then(costumers => costumers.slice(Math.max(costumers.length - 10, 0)));

export const deleteCustomer = customerId => request(`/${customerId}`, {method: 'DELETE'});

export const saveCustomer = customer => request('/', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(customer),
});