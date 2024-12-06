import toast from 'react-hot-toast';

type status = 'success' | 'error' | 'info' | 'warning'
export const toastMessage = (message: string, status: status) => {
    return toast(message, {
        icon: status == 'success' ? '✅' : status == 'error' ? '❌' : status === 'info' ? ' 💡 ' : '⚠️',
        style: {
            borderRadius: '10px',
            background: status == 'success' ? '#28a745' : status == 'error' ? '#dc3545' : status === 'info' ? '#17a2b8' : '#ffc107',
            color: '#fff',
        },
    })
}