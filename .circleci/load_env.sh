# Make new .env file, and load env variables
cat <<EOT > "../$NODE_ENV.env"
PORT=$PORT
GITHUB_API_ACCESS_TOKEN=$GITHUB_API_ACCESS_TOKEN
EOT
