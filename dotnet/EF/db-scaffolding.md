## Scaffolding DB Context

## Filtering Tables
It is possible to specify the exact tables in a schema to use when scaffolding database and to omit the rest. The command-line examples that follow show the parameters needed for filtering tables.

- .NET Core CLI:

`dotnet ef dbcontext scaffold "server=localhost;port=3306;user=root;password=mypass;database=sakila" MySql.Data.EntityFrameworkCore -o sakila -t actor -t film -t film_actor -t language -f`

- Package Manager Console in Visual Studio:

`Scaffold-DbContext "server=localhost;port=3306;user=root;password=mypass;database=sakila" MySql.Data.EntityFrameworkCore -OutputDir Sakila -Tables actor,film,film_actor,language -f`


## Scaffolding with Multiple Schemas

When scaffolding a database, you can use more than one schema or database. Note that the account used to connect to the MySQL server must have access to each schema to be included within the context. Multiple-schema functionality was introduced in Connector/NET 6.10.3-rc and 8.0.9-dmr releases.

The following command-line examples show how to incorporate the sakila and world schemas within a single context.

- .NET Core CLI:

`dotnet ef dbcontext scaffold "server=localhost;port=3306;user=root;password=mypass;database=sakila" MySql.Data.EntityFrameworkCore -o sakila --schema sakila --schema world -f`

- NPM Console  
`Scaffold-DbContext "server=localhost;port=3306;user=root;password=mypass;database=sakila" MySql.Data.EntityFrameworkCore -OutputDir Sakila -Schemas sakila,world -f`


## Data DataAnnotations

- FROM NPM Console:  
`Scaffold-DbContext "Server=.\;Database=AdventureWorksLT2012;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Model -Context "AdventureContext" -DataAnnotations`

- or command line:

`dotnet ef dbcontext scaffold "Server=.\;Database=AdventureWorksLT2012;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -d -o Model -c "AdventureContext"`

## Output directory
`Scaffold-DbContext "server=localhost;port=3306;user=root;password=mypass;database=sakila" MySql.Data.EntityFrameworkCore -OutputDir sakila -f`
