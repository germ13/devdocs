copying and/or odbc sqlite into sqlserver
http://stackoverflow.com/questions/163079/exporting-from-sqlite-to-sql-server

bulk copying sqlite table into sql server
http://stackoverflow.com/questions/5296106/copying-a-huge-table-data-into-another-table-in-sql-server/7354416#7354416

cli for sqlite
http://sqlite.org/cli.html

sqlite odbc driver
https://www.mssqltips.com/sqlservertip/3087/creating-a-sql-server-linked-server-to-sqlite-to-import-data/

sqlite passing Parameters
http://stackoverflow.com/questions/20017688/why-we-do-sqlitecommand-parameters-add-while-we-can-use-string-format-to-compos


using System;
using Mono.Data.Sqlite;

public class Example
{

    static void Main() 
    {
        string cs = "URI=file:test.db";

        using (SqliteConnection con = new SqliteConnection(cs)) 
        {
            con.Open();

            using (SqliteCommand cmd = new SqliteCommand(con))
            {
                cmd.CommandText = "SELECT SQLITE_VERSION()";
                string version = Convert.ToString(cmd.ExecuteScalar());

                Console.WriteLine("SQLite version : {0}", version);
            }             
            
            con.Close();
        }
    }
}


using System;
using Mono.Data.Sqlite;

public class Example
{

    static void Main() 
    {

        string cs = "URI=file:test.db";

        using(SqliteConnection con = new SqliteConnection(cs))
        {
            con.Open();

            using (SqliteCommand cmd = new SqliteCommand(con)) 
            {
                cmd.CommandText = "INSERT INTO Cars(Name, Price) VALUES(@Name, @Price)";
                cmd.Prepare();
                
                cmd.Parameters.AddWithValue("@Name", "BMW");
                cmd.Parameters.AddWithValue("@Price", 36600);
                cmd.ExecuteNonQuery();
            }

            con.Close();
        }
    }
}