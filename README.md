# ArtaferaFrontend

### The frontent for the <a href="www.Artafera.ch">Artafera Website</a>

## Development

To start the Artafera frontend you the following things:

- Angular 18.3 or higher 
- NPM
- Node

Run `npm install` to install all dependency's and afterward run `ng serve` to start the webserver.

## Production

There is a GitHub CI/CD file that is kinda janky but works. The problem I have is that I dont know how I can build a Docker image for an Angular SSR app. I will change that in the future but as it is not that important I dont think it will happen soon. <br>
Currently it runs like this:
- The repo is manually cloned on the backend (just for the first time obviously)
- Whenever a Commit on Main is made, the CI/CD pipeline will execute a script on the server
- The script goes into the cloned frontend repo and pulls the newest changes
- Then it builds the application
- Then it runs it

I know its shit and I want to change it but my focus currently only lies on getting the website up and running.
