import {object, boolean, string} from 'yup'

export const loginSchema = object({
    body: object({
        email: string().email().required(),
        password: string().min(3).required()
    }),
});

export const registerSchema = object({
    body: object({
        email: string().email().required(),
        password: string().min(3).required()
    }),
});

export const createSpeechSchema = object({
    body: object({
        name: string().min(2).max(255).required(),
        type: string().required(),
        years: string().required(),
        save: boolean().required()
    }),
});

