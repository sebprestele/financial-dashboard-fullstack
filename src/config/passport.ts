import passport from 'passport'
import passportLocal from 'passport-local'

import { Request, Response, NextFunction } from 'express'

const LocalStrategy = passportLocal.Strategy
