# redis

## Commands

### Key and values

- SET
- GET
- INCR
- DEL
- SETNX

### Lifetime

- EXPIRE
- TTL

### Lists

- LPUSH
- RPUSH
- LRANGE
- LLEN
- LPOP
- RPOP

### Sets

- SADD
- SREM
- SISMEMBER
- SMEMBERS
- SUNION

### Ordered Sets

- ZADD
- ZRANGE

### Hashes

- HSET
- HGETALL
- HGET

- HINCRBY
- HDEL

## SET

## GET

## INCR

Increments an integer value by 1.

Eg:

```redis
SET count 33
INCR count
GET count
=> 34
```

## Atomicity

A way to avoid non atomic modifications is by using `INCR`

```redis
x = GET count
x = x + 1
SET count x
```

## DEL

## SETNX

## EXPIRE and TTL

```redis
SET username "voltron"
EXPIRE username 120
// 93 seconds pass
TTL username
=> 27
```

A return value of `-2` from TTL means the key does not exist anymore.

```redis
// after another 120 seconds
TTL username
=> -2
```

A return value of `-1` means the key never expires:

```redis
SET killcount 666
TTL killcount
=> -1
```
