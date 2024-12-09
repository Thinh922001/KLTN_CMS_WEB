import { apiRefreshToken } from './../api/auth';
import { apiRequest } from './apiHelper';
import { toastMessage } from './toastHelper';

export const apiRequestRefeshToken = async (
  url: string,
  method: string,
  body?: any,
) => {
  const result = await apiRequest(url, method, body);

  if (result.status === 401 || result.statusCode === 401) {
    const refresh_token = localStorage.getItem('refresh_token');

    if (refresh_token) {
      const resRefreshToken = await apiRefreshToken(refresh_token);
      if (resRefreshToken.statusCode === 200) {
        localStorage.setItem('access_token', resRefreshToken.data.accessToken);
        localStorage.setItem(
          'refresh_token',
          resRefreshToken.data.refreshToken,
        );
        localStorage.setItem('expired', resRefreshToken.data.expired);
        return await apiRequest(url, method, body);
      } else {
        localStorage.clear();
        toastMessage(resRefreshToken.message, 'error');
        window.location.href = '/auth/signin';
        return;
      }
    } else {
      localStorage.clear();
      toastMessage('Lỗi ', 'error');
      window.location.href = '/auth/signin';
    }
  }
  return result;
};
