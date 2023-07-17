## Requirement
- install Docker as container runtime for minikube
- install kubectl
- install minikube (optional)

### overview minikube
physical_machine -> [k8s node] -> [pods]

- pods is smalled unit in k8s which represents a single instance. This pod can contain one container (or shared container with IP, volume, ...)
- deployment will managed pods such as scaling, versioning.
- service will manage networking and load banlancing to access pods within k8s cluter. 

### note
Create single pod in k8s
> kubectl run kbnginx --image=nginx

check pods in default namespace
> kubectl get pods 

check pods in specific namespace
> kubectl get pods --namespace=kube-system

get detail infor pod (namepace, IP, node, statuu, ... of pod)
> kubectl describe pod kbnginx

ssh to minikube
> minikube ssh

get pods ip and node info same as the docker ps
> kubectl get pods -o wide

delete pod
> kubectl delete pod kbnginx

create deployment
> kubectl create deployment nginx-deployment --image=nginx

get deployments pod
> kubectl get deployments

get details deployment
> kubectl describe deployment nginx-deployment

scale up pods in deployment
> kubectl scale deployment nginx-deployment --replicas=3

expose port of pods inside the deployment to outside
> kubectl expose deployment nginx-deployment --port=8080 --target-port=80

get IP address of the deployment. Services was created with specific IP address for the deployment
> kubectl get services

get detail of the service
> kubectl describe service nginx-deployment

delete deployment
> kubectl delete deployment nginx-deployment
> kubectl delete service nginx-deployment

### Docker build and push to docker hub

> docker build . -t harunaga113/k8s-web-hello:latest
> docker login
> docker push harunaga113/k8s-web-hello:latest

### Public the connection from deployment to outside
create deployment image
> kubectl create deployment k8s-web-hello --image=harunaga113/k8s-web-hello

-> create service with type=NodePort
> kubectl expose deployment k8s-web-hello --type=NodePort --port=3000

Or create service with type=LoadBalancer (by default, this service will get the IP address of loadbalancer and input to EXTERNAL-IP. But there are no loadbalancer, it will in pending status and work as NodePort type)
> kubectl expose deployment k8s-web-hello --type=LoadBalancer --port=3000

-> start service
> minikube service k8s-web-hello

### How to deploy new image without interupt
After build image succeed and start deployment service done. 
Procceed to update the new image
> kubectl set image deployment k8s-web-hello k8s-web-hello=harunaga113/k8s-web-hello:1.0.1

Roll out deployment to check status.
> kubectl rollout status deploy k8s-web-hello

##### Deploy use YAML file
-> Create the deployment (deployment.yaml)
create file deployment.yaml -> input file as template here - https://kubernetes.io/docs/reference/kubernetes-api/
> kubectl apply -f deployment.yaml

-> Create the service (service.yaml)
> kubectl apply -f service.yaml

-> Stop all
> kubectl delete -f deployment.yaml -f service.yaml

##### How to connect deployment service to another deployment service
In the different deployment as the same node, we can connect to other service use the service name (for ex: service name is nginx, which will be `http://nginx`)

##### How to write all deployment and service in one file yaml
Just split them by `---`

##### Why we don't use Cluster IP address to connect each other?
Because the IP address was provided by Kubenete node and assign automatically and not stable to use.

### questions

2. How to public connection (ex: nginx) of pod inside of the k8s node?
- Create the deployment -> create the service -> public

1. How to scale and manage automatically in k8s? 
- Use kubectl deployment to create pod, This pod after created will be managed by the deployment.

1. What is deployment in k8s?
- This use to manage and scale-up scale-down pods.

1. How the deployment can keep connect to pod?
- Originally, deployment is seperated with pod. This was connected through `Selector` connect to `Labels` in pod.

1. How many pods can connect to deployment?
- Many, many.

1. Why we need to load balancer for the multiple nodes in cluster?
- Because the deployment and pods can share to the different nodes in the same cluster.



#### Question for the MV setup
1. How to setup replicas 1:1 in each node?
2. Logic flow from the stage Dev create service?