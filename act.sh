#!/bin/sh -l
npm run build
act dispatch -W ./act.yml
