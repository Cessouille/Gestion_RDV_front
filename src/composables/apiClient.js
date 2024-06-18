import { ofetch } from 'ofetch';

const apiClient = ofetch.create({
    baseURL: 'https://localhost:7153/api',
    responseType: 'json',
});

export function useApiClient() {
    return {
        get(url, options) {
            const currentOptions = Object.assign(options ?? {}, { method: 'GET' });
            return apiClient(url, currentOptions);
        },
        post(url, options) {
            const currentOptions = Object.assign(options ?? {}, { method: 'POST' });
            return apiClient(url, currentOptions);
        },
        delete(url, options) {
            const currentOptions = Object.assign(options ?? {}, { method: 'DELETE' });
            return apiClient(url, currentOptions);
        },
        put(url, options) {
            const currentOptions = Object.assign(options ?? {}, { method: 'PUT' });
            return apiClient(url, currentOptions);
        },
        patch(url, options) {
            const currentOptions = Object.assign(options ?? {}, { method: 'PATCH' });
            return apiClient(url, currentOptions);
        },
        uploadFile(url, file, options) {
            const formData = new FormData();
            formData.append('file', file);
            const currentOptions = Object.assign(options ?? {}, {
                method: 'POST',
                body: formData,
            });
            return apiClient(url, currentOptions);
        },
    };
}
