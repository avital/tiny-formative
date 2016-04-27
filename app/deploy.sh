#!/bin/sh
npm install
DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy tiny-formative --settings settings.json
