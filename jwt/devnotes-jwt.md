# JWT

- [JWT](#jwt)
  - [Other types of tokens](#other-types-of-tokens)
  - [Purpose of](#purpose-of)
  - [Process](#process)
  - [Structure](#structure)
    - [Header](#header)
    - [Claims](#claims)
  - [Claims](#claims)
    - [Example](#example)
  - [Nuget Library](#nuget-library)
  - [Consuming a token](#consuming-a-token)
  - [Terms](#terms)
  - [Summary](#summary)
    - [Create](#create)

## Other types of tokens

- SAML
- SWT
- JWT

## Purpose of

Information about the issuer, the issued, and the structure/content of the data.

- Issuer: contains information the issuer and subject (claims).
- Signed (symmetrycally or asymmetrically) Tamper proof and authenticity 
- Expiration time.

## Process

- A client requests a token
- An issuer issues a token
- A resource consumes a token

## Structure

### Header

- Metadata
- algorithms and keys used

### Claims

## Claims

| xx            | meaning | definition |
| ------------- | ------- | ---------- |
| `sub`         | subject |            |
| `unique_name` | x       | x          |
| `role`        |         |            |
| `iss`         | Issuer  | Represents Authorization Server (Token Issuer) |
| `aud`         | Audience | Represents recipient that claim is intendend for  (Relying Party - Resource Server) |
| `exp`         | expiration | Expiration time of JWT (Epoch time) |
| `nbf`         | not before | JWT cannot be used before |

- Issuer(iss)
- Audience(aud)
- IssuedAt(iat)
- Expiration(exp)
- Subject(sub)
- ...application defined claims.

### Example

```json
{
    //Header
    "typ": "JWT"
    ,"alg": "HS256"
}
{
    //Claims
    "iss": "http://myIssuer"
    , "exp": "1340819380"
    , "aud": "http://myResource"
    , "sub": "alice"

    , "client": "xyz"
    , "scope": ["read", "search"]
}
\\ base64urlencodedheader.base64urlencodedclaims.base64urlencoded-header-and-claim
```

## Nuget Library

Microsoft.IdentityModel.Tokens.JWT

```C#
var token = new JWTSecurityToken( ... );
// serialize
var tokenString = new JWTSecurityTokenHandler().WriteToken(token);

```

## Consuming a token

- Retrieve serialized string
  - From http header, query string, etc...
- Validate token.
  - and turn into claims

```C#
var token =- new JWTSecurityTOken(tokenString);
var validationParams = new TokenValidationParams{
  ValidIssuer = "http://myIsssuer"
  , AllowedAudience = "http://myResource"
  , SigningToken = GetSigningKey()
};

var handler = new JWTSecurityTokenHandler();
var principal = handler.ValidateToken(token, validationParams);
```

## Terms

Authorization Server: Token Issuer.
Resource Server: Audience

## Summary

Claims are encoded in JSON which make it more portable.

### Create

Take heeader and payload and base64 url encode each one separetly.
Concatenate each encoded part and concatenate with a period "." in between them.

Then use the `alg` definition in the header to created the signature. This creates a base is a byte array that is 64 bit URL encoded. This signature should then be concatenated with the concatenated header and payload.

- Transmit
- Parse
- Validate
