import DevConfig from './config.dev';

function getConfig(): typeof DevConfig {
  return DevConfig;
}

export default getConfig();
