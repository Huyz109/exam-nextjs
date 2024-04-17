export const loginFunc = async (values: any) => {
    const res = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: values.username,
                password: values.password,
                expiresInMins: 30, // optional, defaults to 60
            })
        })
    console.log(res);
    if (res.ok) {
        return await res.json();
    }
    else {
        return false
    }
}