var parseJson = require('./index.js')
var t = {
    "config": {
        "batch.size": 10000,
        "benchmark.interval": "60000",
        "connect.redis.sink.max.retries": 10,
        "connection.host": "6.3.7.9",
        "connection.port": 6379,
        "connector.class": [1, 2, "test", null]
    },
    "connector": {
        "state": "RUNNING",
        "worker_id": "9.1.83.2:8083"
    },
    "tasks": [
        1,
        "test",
        [1, 2, "arr"],
        {
            "id": 0,
            "state": "RUNNING",
            "worker_id": "9.1.83.3:8083"
        },
        {
            "id": 1,
            "state": "RUNNING",
            "worker_id": "9.1.83.1:8083"
        }
    ]
}

let output = parseJson(t)
console.log(output)
