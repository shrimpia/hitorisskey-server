import fs from 'fs';
import path from 'path';
import url from 'url';

const basePath = path.dirname(url.fileURLToPath(import.meta.url));
const configPath = basePath + '/../config.json';
const configExamplePath = basePath + '/../config.example.json';

if (!fs.existsSync(configPath)) {
  console.log('No config file exists, system will copy it from config.example.json.');
  fs.copyFileSync(configExamplePath, configPath);
}

export const config = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as Config;

export interface Config {
  is_closed_beta: boolean;
  server: {
    host: string;
    port: number;
  };
  sponsors: {
    normal: string[];
    special: string[];
  };
  reaction_emojis: string[];
}
