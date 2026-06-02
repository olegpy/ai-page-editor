import { loadEnv, type Plugin } from 'vite'
import { apiDevMiddleware } from './apiDevMiddleware'

function loadEnvIntoProcess(mode: string, envDir: string): void {
  const fromFiles = loadEnv(mode, envDir, '')
  for (const [key, value] of Object.entries(fromFiles)) {
    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

export function apiDevPlugin(): Plugin {
  return {
    name: 'vite-api-dev',
    configureServer(server) {
      const envDir =
        typeof server.config.envDir === 'string' ? server.config.envDir : process.cwd()
      loadEnvIntoProcess(server.config.mode, envDir)
      server.middlewares.use(apiDevMiddleware)
    },
  }
}
