import { useState, useEffect } from 'react';
import api from '../api/api';
import { UseFetchDataProps } from '../types/interfaces';

const useFetchData = <T>(endpoint: string, interval?: number): UseFetchDataProps<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get<T>(endpoint);
                setData(response.data);
            } catch (error: any) {
                setError(error.response?.data?.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        if (interval) {
            const intervalId = setInterval(fetchData, interval);
            return () => clearInterval(intervalId);
        }
    }, [endpoint, interval]);

    return { data, loading, error };
};

export default useFetchData;
