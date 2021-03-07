import { PrismaClient } from '@prisma/client';
let {PythonShell} = require('python-shell')

export default async (req, res) => {
  const prisma = new PrismaClient({ log: ['query'] });
  const { method, body, query } = req;
  var analysis = "";

  if (method === 'POST') {
    let pyshell = new PythonShell('ai/sentiment.py');
    pyshell.send(body.feedback);
    
    pyshell.on('message', function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      console.log(message);
      analysis = message;
    });
     
    // end the input stream and allow the process to exit
    pyshell.end(function (err,code,signal) {
      if (err) throw err;
      console.log('The exit code was: ' + code);
      console.log('The exit signal was: ' + signal);
      console.log('finished');
      res.status(200).json(analysis);
    });
  }
};