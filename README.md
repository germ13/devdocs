# devdocs

## [IdentityServer](dotnet/identityserver/startup.md)


* Learn
** Java
- [[https://dzone.com/articles/5-courses-to-learn-hibernate-in-2019][Five Courses for Java]]
-[[http://www.java67.com/2017/11/top-5-free-core-spring-mvc-courses-learn-online.html][ 5 Free courses for Spring, Hibernate, and Spring MVC]]
- [[https://javarevisited.blogspot.com/2012/06/20-design-pattern-and-software-design.html][Java design interview questions]]
- [[https://dzone.com/articles/10-essential-tools-every-java-developers-should-kn][Top 10 tools every java dev should know]]
** Angular
- [[http://www.java67.com/2018/01/top-5-free-angular-js-online-courses-for-web-developers.html][Five free Angular courses]]
** Architecture
- [[https://www.udemy.com/from-0-to-1-design-patterns/?ranMID=39197&ranEAID=JVFxdTr9V80&ranSiteID=JVFxdTr9V80-kFtb7YmV3mNtfpc.USpndQ&LSNPUBID=JVFxdTr9V80][Design patterns that matter]]
- [[https://www.udemy.com/java-design-patterns-the-complete-masterclass/?ranMID=39197&ranEAID=JVFxdTr9V80&ranSiteID=JVFxdTr9V80-Mjk5bJFXRkZOv8CeFnspQQ&LSNPUBID=JVFxdTr9V80][Java desing patterns]]
** F#
- [[https://devblogs.microsoft.com/dotnet/submit-to-the-applied-f-challenge/][F# challenge]]
* .NET Core
** Authorization
*** Definitions
GetPolicyAsync
This method returns authorization police for a provided name

GetDefaultPolicyAsync
This method returns the default authorization policy that used by "Authorize" attribute without specifying any policy.

*** Extend from AuthorizeAttribute

Set Policy name and value in setter

*** Create a Authorization Requirement

This is a collection of data that can be used to evaluate the user principal.
One requirement may be associated with different handlers.

Extends from IAuthorizationRequirement

*** Create Authorization Handler

This is the mechanism by to handle properties of the requirement.

Extends from AuthorizationHanddler<T>, where T is an implementation of IAuthorizationRequirement

Has to implement method:
protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MinimumTimeSpendRequirement requirement)  

If it meets the requirement then line context.Succeed(requirement) is executed.

At the end, regardless of the outcome we return an Task.FromResult(0).

*** Custom Policy Provider

** Middleware
*** Creating middleware

```
public class MyMiddleWare {
  private readonly RequestDelegate _next;

  public MyMiddleware(RequestDelegate next){
    _next = next ?? throw new ArgumentNullException(nameof(next));
  }

  public Task Invoke(HttpContext context){
    //Do stuff
    return _next(context);

  }
```

On `Startup.cs` in `Configure` method add line:
```
app.Add(new MyMiddleware());
```
*** Creating Extension method for options
public static class MyMiddlewareExtension{
  public static IApplicationBuilder UseThis(this IApplicationBuilder app){
    if(app == null)
    {
      throw new ArgumentNullException(nameof(app));
    }

    return app.UseMiddleware<MyMiddleWare>();
  }

  public static IApplicationBuilder UseThis(this IApplicationBuilder app, MyMiddlewareOptions options)
  {
    if(app == null)
    { 
      new ArgumentNullException(nameof(app));
    }

    if(options == null)
    {
       throw new ArgumentNullException(nameof(options));
    }

    return app.UseMiddleware<MyMiddleware>(Options.Create(options));
  }
}

       
** Notes

*** Definitions
GetPolicyAsync
This method returns authorization police for a provided name

GetDefaultPolicyAsync
This method returns the default authorization policy that used by "Authorize" attribute without specifying any policy.

*** Extend from AuthorizeAttribute

Set Policy name and value in setter

*** Create a Authorization Requirement

This is a collection of data that can be used to evaluate the user principal.
One requirement may be associated with different handlers.

Extends from IAuthorizationRequirement

*** Create Authorization Handler

This is the mechanism by to handle properties of the requirement.

Extends from AuthorizationHanddler<T>, where T is an implementation of IAuthorizationRequirement

Has to implement method:
protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MinimumTimeSpendRequirement requirement)  

If it meets the requirement then line context.Succeed(requirement) is executed.

At the end, regardless of the outcome we return an Task.FromResult(0).


