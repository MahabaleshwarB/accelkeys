import axiosInstance from '../api/axios';
    
//    const getCurrentUser = async () => {
//         const token = localStorage.getItem('token');
//         const response = await axiosInstance.get('/user/me', {
//             headers:{
//                 Authorization:`Bearer ${token}`,
//             },
//         });
//         return response.data;
//     }

const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axiosInstance.get('/user/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // response.data is now { id: 123, email: "user@example.com" }
        return response.data; 
    } catch (error) {
        console.error("Failed to fetch current user:", error);
        return null;
    }
};


    const getLessons = async () => {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('user/lessons/all', {
            headers:{
                Authorization:`Bearer ${token}`,
            },
        });
        return response.data;
    }

    const getLessonById = async (id) => {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`/user/lessons/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }

    const updateUserStatus = async (userStatusRequest) => {
        const token = localStorage.getItem('token');
        return axiosInstance.put('/user/userdata', userStatusRequest, {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }

    const completeLesson = async (lessonId) => {
        const token = localStorage.getItem('token');
        return axiosInstance.post(`/user/completeLesson`, { lessonId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };

export default {
    getCurrentUser,
    getLessons,
    getLessonById,
    updateUserStatus,
    completeLesson
};

