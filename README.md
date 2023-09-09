# Distributed notification system for serving large volumes of clients

This application was developed within a Kubernetes cluster and aims to provide efficient and scalable notifications services for a large number of customers. To add dynamism and fault tolerance, multiple containerized services implemented in Node.js, along with modern technologies such as Apache Kafka and Apache ZooKeeper, are utilized.

This project leverages Kubernetes cluster management to efficiently handle and scale the containerized services, ensuring adequate processing capacity for the high volume of customers. This enables the application to automatically adapt to increasing or decreasing demand, ensuring optimal performance and seamless user experience.

The producer and consumer services implemented in Node.js are responsible for generating, processing and managing notifications. Apache Kafka is utilized as a distributed messaging system, enabling asynchronous communication among various components of the applications. ZooKeeper ensures coordination and management of distributed resources withing the Kubernetes cluster, providing a scalable and robust environmnent.
