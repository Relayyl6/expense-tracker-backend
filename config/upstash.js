import { Redis } from '@upstash/redis'
import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from './env.js';
import { Ratelimit } from "@upstash/ratelimit";

import { config } from 'dotenv';


const ratelimit = new Ratelimit({
//   url: UPSTASH_REDIS_REST_URL,
//   token: UPSTASH_REDIS_REST_TOKEN
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(50, "60 s")
})

export default ratelimit