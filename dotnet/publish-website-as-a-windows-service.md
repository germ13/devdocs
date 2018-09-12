## Publishing the App

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>netcoreapp2.1</TargetFramework>
    <RuntimeIdentifiers>win10-x64;</RuntimeIdentifiers>
    <OutputType>Exe</OutputType>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>
</Project>
```

Note the `RuntimeIdentifiers` and `OutputType` tags.

From the command line you can enter:  
`dotnet publish --configuration Release --self-contained -r win10-x64`

## Installing as a service.

We will make the app be able to run as a service and as a console.

In NPM console enter:  
`Install-Package Microsoft.AspNetCore.Hosting.WindowsServices`

Then in our `Main` method in our `Program.cs` file we make these changes:

```csharp
public static void Main(string[] args)
{
	var isService = !(Debugger.IsAttached || args.Contains("--console"));
	var builder = CreateWebHostBuilder(args.Where(arg => arg != "--console").ToArray());

	if (isService)
	{
		var pathToExe = Process.GetCurrentProcess().MainModule.FileName;
		var pathToContentRoot = Path.GetDirectoryName(pathToExe);
		builder.UseContentRoot(pathToContentRoot);
	}

	var host = builder.Build();

	if (isService)
	{
		host.RunAsService();
	}
	else
	{
		host.Run();
	}
}
```

### Next
In VisualStudio add an `install.bat` file, and add the following to it:

```bash
sc create MyService binPath= %~dp0MyService.exe
sc failure MyService actions= restart/60000/restart/60000/""/60000 reset= 86400
sc start MyService
sc config MyService start=auto
```

Replace `MyService` with the name of the app.
Rename the `.exe` to the name of your App
Leave the `%~dp0` this refers to the current batch path.


### Uninstall batch
Create an `uninstall.bat` file
```
sc stop MyService
timeout /t 5 /nobreak > NUL
sc delete MyService
```

### Copy files

Make sure that in VisualStudio both the previous files have the `Copy to Ouptut Directory` property set to `Copy if newer`.


### Again
```
dotnet publish --configuration Release --self-contained -r win10-x64
```

In order for installation and uninstallation files be there.
