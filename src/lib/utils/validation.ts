export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
    return {
        hasMinLength: password.length >= 6,
        hasNumberOrSymbol: /[0-9!@#$%^&*]/.test(password),
        hasUpperAndLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
    };
};

export const isPasswordValid = (password: string): boolean => {
    const validation = validatePassword(password);
    return validation.hasMinLength && validation.hasNumberOrSymbol && validation.hasUpperAndLower;
};
