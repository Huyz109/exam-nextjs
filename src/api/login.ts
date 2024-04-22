import { instancePostRequests } from "./axiosAuth";

export const loginFunc = async (values: any) => {
    const res = await instancePostRequests('/login', {
        username: values.username,
        password: values.password,
        expiresInMins: 30, // optional, defaults to 60
    });
    if (res.status === 200) {
        return res.data;
    }
    else {
        return false
    }
}