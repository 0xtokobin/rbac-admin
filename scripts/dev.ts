import { execSync as exec } from 'node:child_process'

const [,,app, env] = process.argv

exec(`pnpm vite --config ./scripts/${app}/index.ts --mode ${env}`)
