# Authenticate
jwt - json web token.
replaces cookie authentication

## Part of JWT
### header
### payload
### signature


## JWT Lifecycle
### login
Via http request
email password validated
encode userid and others against secret payload
send to client
### client gets jwt
store in browser local storage
no idea whats inside
dont care
authenticated as long as i have one (i think?)
### client restarts
in local storage
still authenticated
no matters x's of restarts
unless expired

## JWT Benefits
lightweight
no state set w/ cookies, in memore or database
no db lookup to determine who user is or when jwt expires
mobile ready, no CORS issues

## Client request job
client requests some resource
puts jwt in header fo request
server receives it
looks for jwt in header
decodes
server knows who client is
sends resource
