# [financeplanner.io](https://www.financeplanner.io/)
<br>

Finance planner app to track and calculate finance info from expenses, banking, investments, savings, insurance and get advice from AI features. Developed with MERN, Firebase, Go, GraphQL, Redis, Postgresql, and ML based APIs.
<br>
<br>

<figure>
  <img width="839" alt="image" src="https://github.com/user-attachments/assets/87449cc7-3247-4fdc-8e1e-e5b2340271a4">
</figure>
<br>

[Figure 1: High level view](https://whimsical.com/fin-tracker-S5XFuVeVfa6ktVFyqqNn7S)
<br>
<br>

### The application consists of the following main components:

1. __Client__: React frontend web application which sends requests to the __Finance Planner__ and __Finance Predict__ APIs. The frontend is developed using JavaScript with a TypeScript shift currently in place. State is managed by Redux and the React context API. UI is developed using Material UI, styled components, Tailwind and Bootstrap. It is also deployed with Docker. The client supports requests for the following:
* Chatbot responses
* Expenses
* Banking
* Historic market data
* Finance prediction
* Investments
* Savings
* Insurance
* Miscellaneous financial tools
* Authentication
2. __Authentication__: Authentication is handled using Firebase Authentication and Functions.
3. __Finance Planner API__: API developed using Express and GraphQL, which services majority of requests from the client, excluding predictions. The API requests MongoDB clusters, Redis, Cloud Firestore, AWS RDS databases. Additionally, it requests the [ml-job-scheduler]() to trigger a job to generate finance predictions. It also uses the OpenAI API, polygon.io and other external APIs.
4. __Finance Predict API__: Finance prediction API developed using django and deployed to AWS EC2. API serves requests for finance prediction, market data queries and chatbot queries.
5. __Services__: The following services are used:
* OpenAI: Services chatbot requests
* polygon.io: Provides market data for requests from the __Finance Planner API__
* External APIs: Includes APIs for financial calculations, tools, country specific financial data, etc.
6. __Databases__: The following databases are used:
* MongoDB:
  - Expenses
  - Banking
  - Finance prediction
  - Investments
  - Savings
  - Insurance
* Redis:
  - Cached data
* Cloud Firestore:
  - Authentication
* AWS RDS:
  - ML training data
7. __Machine learning__: ML models for BTC and stock predictions developed using TensorFlow / PyTorch. [ml-job-scheduler](https://github.com/tahmid-saj/ml-job-scheduler) handles the automated job runs from preprocessing, training, predictions, postprocessing, etc. The logs of the job runs are stored in S3 and the data is stored in MongoDB.
8. __Data engineering__: Performs manual data migration using an external ETL / ELT API developed in Go, [etl-elt-api](https://github.com/tahmid-saj/etl-elt-api)
9. __Security__: AWS security services (AWS Inspector and GuardDuty) which monitors the security of APIs. Later, data and logs from the services are queried and viewed using an external security tool.
10. __Monitoring__: Monitoring service which collects data and logs from APIs using CloudWatch, then stores them in S3 to be viewed as a dashboard via an external monitoring tool. 
11. __Notifications__: Receives various data and logs in S3 buckets and later sends emails (on issues or failures) using SQS and Lambda.

### Setting up the development environment:

1. __Cloning the repository__: You would first need to clone this repository on the host you want to set up your development environment:
```shell
git clone https://github.com/tahmid-saj/fin-tracker.git
```
2. __Installing dependencies__: Install the required NPM packages in __package.json__:
```shell
npm install
```
3. __Environment variables__: The required environment variables are used:
```env
# firebase
REACT_APP_FIREBASE_API_KEY=""
REACT_APP_FIREBASE_AUTH_DOMAIN=""
REACT_APP_FIREBASE_PROJECT_ID=""
REACT_APP_FIREBASE_STORAGE_BUCKET=""
REACT_APP_FIREBASE_MESSAGING_SENTER_ID=""
REACT_APP_FIREBASE_APP_ID=""

# There are several other environment variables for the APIs and services used in the client 
```
4. __APIs__: Client requests go to two APIs:
* __Finance Planner API__
* __Finance Predict API__
5. __Services__: API keys are used from the following services in the __Finance Planner API__:
* OpenAI: Services chatbot requests
* polygon.io: Provides market data for requests from the __Finance Planner API__
* External APIs: There are several other external APIs providing financial calculations, tools, country specific financial data, etc.
6. __Databases__: A MongoDB cluster and collections are created, and a connection is established with the __Finance Planner and Finance Predict APIs__. A Redis cluster is also created for storing cached data. Additionally Cloud Firestore and AWS RDS are both initialized for storing authentication and finance prediction data respectively.
7. __Data engineering__: The set up for the development environment for the data engineering tool can be found [here](https://github.com/tahmid-saj/etl-elt-api).
8. __Machine learning__: The set up for the development environment for the ML job scheduler can be found [here](https://github.com/tahmid-saj/ml-job-scheduler).
9. __AWS__: Setting up the AWS services is an optional step as this is on a development environment. However, the same services could be used to create the tools mentioned in the high level view.
10. __Running the client__: The client can be run using:
```
npm start
```
