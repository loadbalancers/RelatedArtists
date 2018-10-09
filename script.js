import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 200,
  duration: '30s' 
  //stages: [{
    // { duration: '30s', target: 50}
  //}] 
}

export default function() {
  let res = http.get(`http://localhost:3005/15/related-artists`);
  // console.log('I love porkchop!');
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
  sleep(1);
};
