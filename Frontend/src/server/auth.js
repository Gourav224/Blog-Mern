/* eslint-disable no-useless-catch */
import axios from 'axios';

export class AuthService {
    async createAccount({ email, password, fullName }) {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/users/register', {
                email,
                password,
                fullName
            });

            // Log specific information from the response
            console.log('Response:', response.data);

            if (response.status >= 200 && response.status < 300) {
                // Successful response status, call another method
                return await this.login(email, password);
            }

            // Handle other status codes or return the response object
            return response;
        } catch (error) {
            // More specific error handling can be added based on the error type
            console.error('Error during user registration:', error.message);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            console.log(email, password);
            const loggedUser = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/v1/users/login',
                data: {
                    email,
                    password,
                }
            });
            console.log(loggedUser);
            return loggedUser;
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser() {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/users/get-current-user', {withCredentials: true});
            console.log(response)
            // Check if the response status is in the success range (2xx)
            if (response.status >= 200 && response.status < 300) {
                console.log('User data:', response.data);
                return response.data; // Return user data
            } else {
                console.log('Server error:', response.statusText);
                // You might want to throw an error here or handle it in a way that suits your application
            }
        } catch (error) {
            console.log('Error:', error.message);

            // You might want to throw an error or handle it in a way that suits your application
        }
        return null;
    }


    async logout() {
        try {
            return await axios({
                method: 'post',
                url: '/api/users/logout',
            });
        } catch (error) {
            throw error;
            // console.log("Appwrite service :: logout :: error", error);
        }
    }

}
const authService = new AuthService();
export default authService;