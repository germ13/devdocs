import pandas
thedata = pandas.read_csv('file.csv') # thedata now holds a dataframe
thedata['fname'] #pulls column
thedata['fullname'] = thedata['fname'] + ' ' + thedata['lname']
thedata.to_csv('file.csv') #write to csv
