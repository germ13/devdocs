WPF
===

Templates
---------
Three types:
- Control Template
- Item Panel Template
- Data Template

### Control Template
### Item Panel Template
### Data Template


Data Context
------------
User interface elements have a `DataContext` dependency property.

Binding Class
-------------
[API](http://msdn2.microsoft.com/en-us/library/system.windows.data.binding_members.aspx "MSDN Link")

Properties
-----------
- `Source`
- `Path`
- `ElementName`
- `Converter`

### Source
References `Binding`'s data source.
By default references element's `DataContext`

### Path
Used to indicate from which property on the source object to get and set the bound data value.

### ElementName
An alternate to `Source` property.  Allows the ability to use a XAML Element as a data source.

### Converter
This property can be set as an instance of a class which implements `IValueConverter`.
Intercepts data from the DataSource to binding source and vice versa.  Conversion can be implemented in the process.

As an example, imagine in the DataSource the value is a `Boolean`, (`false` and `true`), 
but in the binding source you want the value to show as "NO" or "YES", respectively.
ONe would use the converter property for this.
 