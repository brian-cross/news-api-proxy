# News API Proxy

A simple Express server to proxy requests to [https://newsapi.org/](https://newsapi.org/). Hides the API key from the front end by keeping the key in a .env file on the server. The key is passed to the actual API using an auth header, as per the recommendation in the News API docs.

Written in [Typescript](https://www.typescriptlang.org/) because why not?
