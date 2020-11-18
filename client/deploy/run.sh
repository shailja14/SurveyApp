#!/bin/bash

[ -z "$1" ] &&  echo "ERROR: Environment required."  && exit 1

env=$1

# Deploy
sed s/\$ENVIRONMENT/${env}/g  deploy/k8s.yaml | kubectl apply -f -