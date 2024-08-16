import { useState, useEffect } from 'react';

type FetchData<T> = {
    data: T | null;
    error: Error | null;
    loading: boolean;
};

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: HeadersInit;
    body?: BodyInit;
}

function useFetch<T = unknown>(url: string, options: FetchOptions = {}): FetchData<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, {
                    method: options.method || 'GET',
                    headers: options.headers,
                    body: options.body,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result: T = await response.json();

                if (isMounted) {
                    setData(result);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err as Error);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url, options.method, options.headers, options.body]);

    return { data, error, loading };
}

export default useFetch;
