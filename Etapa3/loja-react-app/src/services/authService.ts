import Config from 'react-native-config';

// const API_URL = Config.API_URL;
const API_URL = 'http://10.81.205.27:5000';

export async function fakelogin(
    email: string,
    password: string
): Promise<string> {
    if (email === 'text@exemple.com' && password === '123') {
        return Promise.resolve('fake-jwt-token');
    }
    return Promise.reject('Invalid credentials');
}

export async function requestLogin(
    email: string,
    password: string
): Promise<string> {
    console.log(API_URL);
    try {
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        const jwt = data.accessToken;
        console.log(jwt);
        return Promise.resolve(jwt);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
        // return Promise.reject('Credenciais inválidas');
    }
}
