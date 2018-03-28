# OpenIdentity 4

Based on [Getting Started With IdentityServer 4](https://www.scottbrady91.com/Identity-Server/Getting-Started-with-IdentityServer-4)

## Startup

- Create an "Empty MVC 2.0 Core C#" app, with "No Authentication"

- Nuget `Install-Package IdentityServer4`

- In `ConfigureServices` method add the following:

```c#
services.AddIdentityServer()
    .AddInMemoryClients(new List<Client>())
    .AddInMemoryIdentityResources(new List<IdentityResource>())
    .AddInMemoryApiResources(new List<ApiResource>())
    .AddTestUsers(new List<TestUser>())
    .AddDeveloperSigningCredential();
```

- In your `Configure` method add 

```c#
app.UseIdentityServer();
```

- Compile and run.

- Check that url `/.well-known/openid-configuration` is working.

## Signed Certificate

- Can be checked by going to `jwks_uri` 


## Clients, Resource, and Users

Clients are applications that are allowed to use IdentityServer.  
Resources are the things that can be used/accessed on those clients.  
And users are the 'users' allowed to authenticate on them.  

### Clients 

Is a whitelist of apps allowed to use IdentityServer.  Each client application is configured to only be allowed to do certain things:  only ask for tokens returned to certain urls, or only request certain information.

Their access is scoped.

### Resource and Scopes

Scopes represent what the client is allowed to do.
They represent access, and are modelled as resources.

There are two flavors of scope: Identity and API.

- _Identity resource_: allows you to model a scope that will return a certain set of claims.

- _API resource_: model access to a protected resource (typically an API).










