const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("counselorToken") || "";

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
