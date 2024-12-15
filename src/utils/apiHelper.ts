import { EOrderStatus, OrderStatus } from '@/Types/order';

export const apiRequest = async (url: string, method: string, body?: any) => {
  const path =
    import.meta.env.VITE_ENVIRONMENT == 'developer'
      ? import.meta.env.VITE_API_BACKEND_PATH_DEV
      : import.meta.env.VITE_API_BACKEND_PATH_PRODUCTION;

  const headers: Record<string, string> = {
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    'x-api-key': import.meta.env.VITE_API_KEY ?? '',
  };

  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${path}${url}`, {
    method: method,
    headers: headers,
    body: body instanceof FormData ? body : JSON.stringify(body),
    credentials: 'include',
  });

  const result = await response.json();

  return result;
};

export const hanldeShowStatus = (): string[] => {
  return [
    OrderStatus.Canceled,
    OrderStatus.Completed,
    OrderStatus.Pending,
    OrderStatus.Processing,
    OrderStatus.Returned,
  ];
};
