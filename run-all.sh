#!/bin/bash
concurrently "cd client && npm run dev" "cd server && npm run dev"