import pgPromise from 'pg-promise';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body)
  const { connectionString } = req.body

  // connect
  const pgp = pgPromise();
  const db = pgp(connectionString); 

  try {
    const result = await db.query('SELECT NOW()');
    console.log(result);
    res.status(200).json(result)
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(200).json({error})
  } finally {
    // Disconnect from the database
    pgp.end();
  }
 
}
