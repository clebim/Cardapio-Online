import 'reflect-metadata';
import './boostrap';
import './Shared/Container/index';

import Queue from './Shared/Services/QueueService/QueueService';

Queue.processQueue();
