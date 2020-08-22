# Ticketing

## Usage

Start the app by running `skaffold dev` in the root directory

In order to run this successfully, you will need to have created the jwt secret within your kubernetes cluster, and will need to have install `ingress-nginx`

### Creating a Secret in Kubernetes

Run the following command to create a secret that can be injected into service containers:
`kubectl create secret generic jwt-secret --from-literal=jwt=asdf`

### Installing ingress-nginx

Follow the instructions here: https://kubernetes.github.io/ingress-nginx/deploy/

