import {Router} from 'express'
import {createNewUser, signIn} from "./handlers/user";
import {generateSpeech} from "./handlers/generate";
import {getSpeeches} from "./handlers/speeches";

import app from "./server";
import {userAuthentication} from "./modules/auth";

const router = Router()

router.post('/register', createNewUser)
router.post('/signin', signIn)
router.post('/generate', userAuthentication, generateSpeech)
router.get('/speeches',userAuthentication, getSpeeches)

export default router