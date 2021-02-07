import 'reflect-metadata';
import './boostrap';
import './Shared/Container/index';

import Queue from './Shared/Services/QueueService/QueueService';

// eslint-disable-next-line no-console
console.log(`🚀🚀 Queue service started `);
Queue.processQueue();
