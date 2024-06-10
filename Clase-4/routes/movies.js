import { Router } from 'express' // ---> crea un enrutador para resolver todos los pasos

import { MovieController } from '../controllers/movies.js'
export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.post('/', MovieController.create)

moviesRouter.get('/:id', MovieController.getById)
moviesRouter.delete('/:id', MovieController.delete)
moviesRouter.patch('/:id', MovieController.update)
