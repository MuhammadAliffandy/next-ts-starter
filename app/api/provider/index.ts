import { BASE_URL } from "@/app/utils/constants";
import axios, { AxiosResponse } from "axios";

export const PROVIDER_GET = async (pathUrl: string): Promise<any> => {
    const headers = {
        'Content-Type': 'application/json',
        // 'ADS-Key':ADS_KEY
    }

    try {
        const response: AxiosResponse = await axios.get(`${BASE_URL}/${pathUrl}`, { headers });
        
        switch (response.status) {
            case 200:
            case 201:
                return response.data;
            case 403:
                throw new Error("forbidden");
            default:
                throw new Error("error");
        }
    } catch (err) {
        throw err;
    }
}

export const PROVIDER_POST = async (pathUrl: string, data: any): Promise<any> => {
    const headers = {
        'Content-Type': 'application/json',
        // 'ADS-Key':ADS_KEY
    }

    try {
        const response: AxiosResponse = await axios.post(`${BASE_URL}/${pathUrl}`, data, { headers });

        switch (response.status) {
            case 200:
            case 201:
                return response.data;
            default:
                throw new Error("error");
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const errorResponse = err.response;
            if (errorResponse) {
                switch (errorResponse.status) {
                    case 401:
                        throw errorResponse.data;
                    case 403:
                        throw new Error("forbidden");
                    case 404:
                        throw errorResponse.data;
                    default:
                        throw new Error("error");
                }
            }
        }
        throw err;
    }
}

export const PROVIDER_DELETE = async (pathUrl: string): Promise<any> => {
    const headers = {
        'Content-Type': 'application/json',
        // 'ADS-Key':ADS_KEY
    }

    try {
        const response: AxiosResponse = await axios.delete(`${BASE_URL}/${pathUrl}`, { headers });

        switch (response.status) {
            case 200:
            case 201:
                return response.data;
            default:
                throw new Error("error");
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const errorResponse = err.response;
            if (errorResponse) {
                switch (errorResponse.status) {
                    case 401:
                        throw errorResponse.data;
                    case 403:
                        throw new Error("forbidden");
                    case 404:
                        throw errorResponse.data;
                    default:
                        throw new Error("error");
                }
            }
        }
        throw err;
    }
}

export const PROVIDER_PUT = async (pathUrl: string, data: any): Promise<any> => {
    const headers = {
        'Content-Type': 'application/json',
        // 'ADS-Key':ADS_KEY
    }

    try {
        const response: AxiosResponse = await axios.put(`${BASE_URL}/${pathUrl}`, data, { headers });

        switch (response.status) {
            case 200:
            case 201:
                return response.data;
            default:
                throw new Error("error");
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const errorResponse = err.response;
            if (errorResponse) {
                switch (errorResponse.status) {
                    case 401:
                        throw errorResponse.data;
                    case 403:
                        throw new Error("forbidden");
                    case 404:
                        throw errorResponse.data;
                    default:
                        throw new Error("error");
                }
            }
        }
        throw err;
    }
}
