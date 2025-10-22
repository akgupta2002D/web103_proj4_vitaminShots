// server/config/seed.js
import './dotenv.js'
import { pool } from './database.js'

const BASE_PRICE = 3
const calcPrice = (base, supplement) => {
  let price = BASE_PRICE
  if (base === 'Beetroot') price += 1
  if (supplement === 'Turmeric') price += 0.5
  return Number(price.toFixed(2))
}

const shots = [
  {
    name: 'Glow Shot',
    base_juice: 'Orange',
    supplement: 'Vitamin C',
    flavor: 'Ginger',
    benefit: 'Immunity',
  },
  {
    name: 'Iron Boost',
    base_juice: 'Beetroot',
    supplement: 'Iron',
    flavor: 'Lemon',
    benefit: 'Energy',
  },
  {
    name: 'Gut Cleanse',
    base_juice: 'Coconut',
    supplement: 'Turmeric',
    flavor: 'Mint',
    benefit: 'Gut Health',
  },
  {
    name: 'Morning Kick',
    base_juice: 'Orange',
    supplement: 'Turmeric',
    flavor: 'Lemon',
    benefit: 'Energy',
  },
  {
    name: 'Chill Mint',
    base_juice: 'Coconut',
    supplement: 'Vitamin C',
    flavor: 'Mint',
    benefit: 'Immunity',
  },
]

async function seed() {
  console.log('🌱 Seeding vitamin_shots...')
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    // Ensure table exists (optional, keeps seed idempotent if reset wasn't run)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vitamin_shots (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        base_juice TEXT NOT NULL,
        supplement TEXT NOT NULL,
        flavor TEXT NOT NULL,
        benefit TEXT NOT NULL,
        price NUMERIC(5,2) NOT NULL
      );
    `)

    // Clear existing rows
    await client.query('DELETE FROM vitamin_shots;')

    // Insert new rows
    for (const s of shots) {
      const price = calcPrice(s.base_juice, s.supplement)
      await client.query(
        `
        INSERT INTO vitamin_shots
          (name, base_juice, supplement, flavor, benefit, price)
        VALUES
          ($1,   $2,         $3,         $4,    $5,      $6)
        `,
        [s.name, s.base_juice, s.supplement, s.flavor, s.benefit, price]
      )
      console.log(`  ✓ Inserted: ${s.name} ($${price})`)
    }

    await client.query('COMMIT')
    console.log('✅ Seed complete!')
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('❌ Seed failed:', err.message)
    process.exitCode = 1
  } finally {
    client.release()
    await pool.end()
  }
}

seed()
