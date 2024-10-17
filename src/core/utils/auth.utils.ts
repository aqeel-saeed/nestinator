export async function apiResponse(data: any, message= '') {
    return {
        data: data,
        message: message
    };
}

export function generateRandomCode(length: number) {
    const digits = '0123456789';
    let code = '';

    for (let i = 0; i < length; i ++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        code += digits[randomIndex];
    }

    return code;
}