import { PrismaClient } from '@prisma/client';

// * ?event=13984
export default async (req, res) => {
  const prisma = new PrismaClient({ log: ['query'] });
  const { method, body, query } = req;

  if (method === 'POST') { // Create new event
    const newEvent = await prisma.event.create({
      data: {
        id: body.id,
        title: body.title,
      },
    });
    return res.status(201).json({ event: newEvent });
  } if (method === 'GET') {
    if (query.id) { // Get existing event
      const event = await prisma.event.findUnique({
        where: {
          id: query.id,
        },
      });
      if (event) {
        return res.status(200).json({ event });
      }
      return res.status(404).json({}); // Not found
    }
    // Get a list of all existing events
    const allEvents = await prisma.event.findMany();
    return res.status(200).json({ events: allEvents });
  } if (method === 'DELETE') {
    // * Delete code here (if Host ends event early)
  }

  return res.status(400).json({}); // Bad request
};
