#!/bin/bash
zip -rq app.zip app.js package.json .env node_modules db views schemas workers
#bx wsk action create employees/humanity --kind nodejs:8 app.zip
bx wsk action update employees/humanity --kind nodejs:8 app.zip
rm app.zip
# bx wsk action invoke --blocking employees/onsipwebhook