const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiRequest(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok || data.success === false) {
        throw new Error(data.message || "API 요청 실패");
    }

    return data;
}

export function getImageUrl(path) {
    return `${BASE_URL}${path}`;
}