import { authenticateUser } from '../_apiUtils.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { reports } from '../../drizzle/schema.js';
import * as Sentry from '@sentry/node';

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    const { title, content } = req.body;

    const [newReport] = await db.insert(reports)
      .values({
        userId: user.id,
        title,
        content
      })
      .returning();

    res.status(200).json(newReport);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}
