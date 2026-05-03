import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5, // Virtual Users
  duration: '5s', // Run for 5 seconds
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
  },
};

export default function () {
  // Test the server health endpoint
  const res = http.get('http://localhost:8080/api/health');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'latency is acceptable': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
