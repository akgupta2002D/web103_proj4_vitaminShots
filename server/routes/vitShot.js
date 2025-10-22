import express from 'express'
import { getShots, getShotById, createShot, updateShot, deleteShot } from '../controllers/vitShot.js'

const router = express.Router()

router.get('/shots', getShots)
router.get('/shots/:id', getShotById)
router.post('/shots', createShot)
router.put('/shots/:id', updateShot)
router.delete('/shots/:id', deleteShot)

export default router
