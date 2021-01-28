import { ConnectionOptions, createConnection } from 'typeorm';
import { defaultConfig, testConfig } from '../Config/DatabaseConfig';

const config: ConnectionOptions =
  process.env.NODE_ENV === 'test' ? testConfig : defaultConfig;

const connection = createConnection(config);

export default connection;
