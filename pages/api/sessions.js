import { PrismaClient } from '@prisma/client';

// * ?session=13984
export default async (req, res) => {
  const prisma = new PrismaClient({ log: ['query'] });
  const { method, body, query } = req;

  if (method === 'POST') { // Create new session
    const newSession = await prisma.session.create({
      data: {
        id: body.id,
        title: body.title,
      },
    });
    return res.status(201).json({ session: newSession });
  } if (method === 'GET') {
    if (query.id) { // Get existing session
      const session = await prisma.session.findUnique({
        where: {
          id: query.id,
        },
      });
      if (session) {
        return res.status(200).json({ session });
      }
      return res.status(404).json({}); // Not found
    }
    // Get a list of all existing sessions
    const allSessions = await prisma.session.findMany();
    return res.status(200).json({ sessions: allSessions });
  }

  return res.status(400).json({}); // Bad request
};
