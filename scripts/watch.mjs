import { createServer, build } from 'vite';
import { spawn } from 'child_process';
import electron from 'electron';

// start renderer
async function startRenderer() {
  // start renderer process
  const server = await createServer({ configFile: 'src/renderer/vite.config.js' });
  await server.listen();
  server.printUrls();

  return server;
}

// watch prelaod
function watchPreload(server) {
  return build({
    configFile: 'src/preload/vite.config.js',
    mode: 'development',
    plugins: [{
      name: 'electron-preload-watcher',
      writeBundle() {
        server.ws.send({ type: 'full-reload' });
      }
    }],
    build: {
      watch: true
    }
  });
}

// start main process and watch
async function startMainProcess(server) {
  let electronProcess = null;

  const address = server.httpServer.address();
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_HOST: address.address,
    VITE_DEV_SERVER_PORT: address.port
  });

  return build({
    configFile: 'src/main/vite.config.js',
    mode: 'development',
    plugins: [{
      name: 'electron-main-watcher',
      writeBundle() {
        if (electronProcess) {
          electronProcess.kill();
        }
        electronProcess = spawn(electron, ['.'], { stdio: 'inherit', env });
      }
    }],
    build: {
      watch: true
    }
  });
}

(async () => {
  const server = await startRenderer();
  await watchPreload(server);
  await startMainProcess(server);
})();
