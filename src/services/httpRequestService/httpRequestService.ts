import { Output } from '@/services/httpRequestService/types';

export class HttpRequestService {
    static async fetch<T>(url: string, options?: RequestInit): Promise<Output<T>> {
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return { data, error: null };
        } catch (e) {
            return { data: null, error: e };
        }
    }
}
