import { getValueFromLocalStorageObject } from '@/utils/local-storage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function usePermission() {
  const navigate = useNavigate();

  useEffect(() => {
    const roleName = getValueFromLocalStorageObject('admin', 'roleName');
    if (roleName === 'ADMIN') {
      navigate('/');
    }
  }, [navigate]);
}
