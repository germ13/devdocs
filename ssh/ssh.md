# ssh notes

## Permissions

On `.ssh` directory permissions should be set to `chmod 700`

On `id_rsa` file or any other private ssh key file it should be set at either `600` or `400` depending on your requirements.

## Generating RSA keys

`ssh-keygen -t rsa`  
or for better security.  
`ssh-keygen -t rsa -b 4096`  
  The default is 2048.  

## Transfer client key to host

If one has `ssh` access then one can use:  
`ssh-copy-id <username>@<host>`

As an alternate one can concatenate the public key to the host by doing the following

`cp authorized_keys authorized_keys.bak`  
`cat id_rsa.pub >> authorized_keys`

Check with:  
`ssh <username>@<host>`  
from client.



