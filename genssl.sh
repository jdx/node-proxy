#!/usr/bin/env bash

mkdir -p ssl
openssl req -x509 -out ssl/localhost.crt -keyout ssl/localhost.key \
  -newkey rsa:2048 -nodes -sha256 -subj '/CN=myapp.heroku.local' # \
  # -extensions EXT -config <( \
  #  printf "[dn]\\nCN=myapp.heroku.local\\n[req]\\ndistinguished_name = dn\\n[EXT]\\nsubjectAltName=DNS:myapp.heroku.local\\nkeyUsage=digitalSignature\\nextendedKeyUsage=serverAuth")
