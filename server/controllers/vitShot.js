import { pool } from '../config/database.js'

// GET all shots
export async function getShots(req, res) {
  const result = await pool.query('SELECT * FROM vitamin_shots ORDER BY id ASC')
  res.json(result.rows)
}

// GET one shot
export async function getShotById(req, res) {
  const result = await pool.query('SELECT * FROM vitamin_shots WHERE id = $1', [req.params.id])
  res.json(result.rows[0])
}

// CREATE new shot
export async function createShot(req, res) {
  const { name, base_juice, supplement, flavor, benefit, price } = req.body

  // simple "impossible combo" rule
  if (supplement === 'Iron' && benefit === 'Immunity') {
    return res.status(400).json({ error: 'Iron cannot be mixed with Immunity booster' })
  }

  const result = await pool.query(
    `INSERT INTO vitamin_shots (name, base_juice, supplement, flavor, benefit, price)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [name, base_juice, supplement, flavor, benefit, price]
  )
  res.json(result.rows[0])
}

// UPDATE shot
export async function updateShot(req, res) {
  const { id } = req.params
  const { name, base_juice, supplement, flavor, benefit, price } = req.body

  const result = await pool.query(
    `UPDATE vitamin_shots SET name=$1, base_juice=$2, supplement=$3, flavor=$4, benefit=$5, price=$6 WHERE id=$7 RETURNING *`,
    [name, base_juice, supplement, flavor, benefit, price, id]
  )
  res.json(result.rows[0])
}

// DELETE shot
export async function deleteShot(req, res) {
  const { id } = req.params
  await pool.query('DELETE FROM vitamin_shots WHERE id=$1', [id])
  res.json({ message: 'Shot deleted' })
}
