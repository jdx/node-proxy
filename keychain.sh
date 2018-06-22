#!/usr/bin/env bash

sudo /usr/bin/security add-trusted-cert -d -k /Library/Keychains/System.keychain -p ssl ./ssl/localhost.crt
