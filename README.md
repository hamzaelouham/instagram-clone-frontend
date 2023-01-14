### run application

yarn run dev

### build docker image

docker build -t <YOUR_DOCKERHUB_USERNAME>/insta-clone .

### push docker image

docker push <YOUR_DOCKERHUB_USERNAME>/insta-clone

### run docker image localy

docker run -p 3000:3000 -e PORT=3000 <YOUR_DOCKERHUB_USERNAME>/insta-clone

### check your k8s client version

kubectl version --short

### apply your deployment

cd /k8s && kubectl apply -f deployments/deployment.yaml

### create service

cd /k8s && kubectl apply -f services/servce.yaml
