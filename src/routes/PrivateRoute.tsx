import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { apiRefreshToken } from '../api/auth';
import { toastMessage } from '../utils/toastHelper';
import Loader from '@/common/Loader';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [_stateApi, handleStateApi] = useFetch();
  
  useEffect(() => {
    
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const expired = localStorage.getItem('expired');

      if (!token || !refreshToken || !expired) {
        toastMessage("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!", 'error');
        navigate('/auth/signin');
        setLoading(false);
        return;
      }
      
      const now = new Date().getTime();
      const expiredTime = new Date(expired).getTime();
      
      if (now > expiredTime) {
        const resRefreshToken = await handleStateApi(() => apiRefreshToken(refreshToken));
        console.log("api của nó: ", resRefreshToken);
        
        if (resRefreshToken && resRefreshToken.statusCode === 200) {
          localStorage.setItem('accessToken', resRefreshToken.data.accessToken);
          localStorage.setItem('refreshToken', resRefreshToken.data.refreshToken);
          localStorage.setItem('expired', resRefreshToken.data.expired);
        } else {
          localStorage.clear();
          navigate('/auth/signin');
          toastMessage(resRefreshToken.message, 'error');
        }
      }
      
      setLoading(false);
    };

    fetchData();
  }, [handleStateApi, navigate]);

  if (loading) {
    return <Loader />;
  }

  return !loading && element;
};

export default PrivateRoute;
