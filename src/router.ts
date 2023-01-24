import {Router} from 'express'
import {createNewUser, signIn} from "./handlers/user";
import {generateSpeech} from "./handlers/generate";
import {getSpeeches} from "./handlers/speeches";
import {loginSchema, registerSchema, createSpeechSchema} from "./validation/validationSchema";
import validatePost from "./modules/validation"

import app from "./server";
import {userAuthentication} from "./modules/auth";

const router = Router()
router.post('/register', validatePost(registerSchema), createNewUser)
router.post('/signin', validatePost(loginSchema), signIn)

router.post('/generate', validatePost(createSpeechSchema), userAuthentication, generateSpeech)
router.get('/speeches', userAuthentication, getSpeeches)

export default router