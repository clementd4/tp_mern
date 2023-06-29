import Cookies from 'universal-cookie';

export default function getToken() {
    try {
        const token = new Cookies().get('token')
        return token;
    } catch {
        return null;
    }
}
