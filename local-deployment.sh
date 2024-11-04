#!/bin/bash

version=$(cat "version.txt")
currentVersion=$(cat "version.txt")
version=$((version + 1))
rm -rf output
rm -rf node_modules
javascript-obfuscator ./ --output ./output --compact true --simplify true,

rm -rf output/.env
docker images --format "{{.Repository}}:{{.Tag}}" | grep "^tintinto_controller_api:" | xargs -r docker rmi

echo "Creating Buildx builder..."
docker buildx create --use

# Build and push the image for multiple platforms
echo "Building and pushing the image..."
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --pull \
  --rm \
  -f Dockerfile \
  -t geniusgrid/tintinto_controller_api:1.0.$version \
  . \
  --push

echo "Image geniusgrid/tintinto_controller_api:1.0.$version has been built and pushed successfully."

npm i

echo "$version" > "version.txt"

# Commands to run on the server
COMMANDS=$(cat <<EOF
docker stop tintinto_controller_api
docker rm tintinto_controller_api
docker run -d --restart unless-stopped --network host --name tintinto_controller_api -e telegram_bot=7447429178:AAF3i71CEbOOQs9KGWMnCUd2z5gDjkEalF0 -e api=https://api.atenanla.com/api/v1.0/ -e db_name=tintinto -e db_user=root -e db_pass=mDd5cAjukLqSfzlqHMYB0A84T8Fg1sK7 -e db_host=165.227.135.105 -e PORT=28090 geniusgrid/tintinto_controller_api:1.0.$version
exit
EOF
)

# SSH into the server and run commands
ssh -o StrictHostKeyChecking=no "root@165.227.135.105" "$COMMANDS"

# Check the exit status
if [ $? -eq 0 ]; then
    echo "Commands executed successfully"
else
    echo "Error executing commands"
fi

docker images --format "{{.Repository}}:{{.Tag}}" | grep "^tintinto_controller_api:" | xargs -r docker rmi

container_ids=$(docker ps -q)
# Loop through each container ID
for id in $container_ids; do
    echo "Processing container ID: $id"
    
    docker stop ${id}
     docker rm ${id}
done

# y || docker volume prune -a