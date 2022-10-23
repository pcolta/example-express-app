import { login, signup } from "../service/user-service";
const express = require('express')
const router = express.Router()

router.post("/login", login);

router.post("/signup", signup);

export default router;
