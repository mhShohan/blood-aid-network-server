import { Server, createServer } from 'http';
import app from './app';
import config from './config';
import liveDB from './lib/liveDB';

let server: Server = createServer(app);

async function main() {
  try {
    server = server.listen(config.PORT, () => {
      setInterval(liveDB, 12 * 60 * 60 * 1000);
      console.log(`Server is listening on port ${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`unhandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
