# Rock Solid Express Application Architecture

This is a battle tested application architecture that I've been using for a while now on medium to large projects at work. Although not perfect, so far it has proved itself to be a reliable, scalable and manageable project architecture.

I've also tried to comply with many popular Node.js best practices as long as they were within my limits. There are some best practices that I left off intentionally such as the usage of Node.js specific plugins for ESLint. I've been using the amazing [airbnb/javascript](https://github.com/airbnb/javascript) plugin for all my projects and I'm happy with it. Another practice that I avoid is wrapping common utilities in a separate package. Well I do opt-in for a separate package when I have large number of shared utilities but for simple stuff like the `authenticate` or `authorize` middleware, I stick with simple `require()` statements.

There are some other best practices that I haven't yet picked up but will soon. Such as the practice of tagged tests, higher test coverage or testing my middleware in isolation. Also the production oriented best practices have been left off of this project but we do follow the common best practices at work when actually putting someting in production.

## Compliance with [goldbergyoni/nodebestpractices](https://github.com/goldbergyoni/nodebestpractices/)

- [ ] Project Structure Practices
  - [x] Structure your solution by components
  - [x] Layer your components, keep the web layer within its boundaries
  - [ ] Wrap common utilities as npm packages
  - [x] Separate Express 'app' and 'server'
  - [x] Use environment aware, secure and hierarchical config
- [ ] Error Handling Practices
  - [x] Use Async-Await or promises for async error handling
  - [x] Use only the built-in Error object
  - [x] Distinguish operational vs programmer errors
  - [x] Handle errors centrally, not within a middleware
  - [ ] Document API errors using Swagger or GraphQL
  - [ ] Exit the process gracefully when a stranger comes to town
  - [x] Use a mature logger to increase error visibility
  - [x] Test error flows using your favorite test framework
  - [ ] Discover errors and downtime using APM products
  - [ ] Catch unhandled promise rejections
  - [x] Fail fast, validate arguments using a dedicated library
  - [x] Always await promises before returning to avoid a partial stacktrace
- [ ] Code Style Practices
  - [x] Use ESLint
  - [ ] Node.js specific plugins
  - [x] Start a Codeblock's Curly Braces on the Same Line
  - [x] Separate your statements properly
  - [ ] Name your functions
  - [x] Use naming conventions for variables, constants, functions and classes
  - [x] Prefer const over let. Ditch the var
  - [ ] Require modules first, not inside functions
  - [x] Require modules by folders, as opposed to the files directly
  - [x] Use the `===` operator
  - [x] Use Async Await, avoid callbacks
  - [x] Use arrow function expressions (=>)
- [ ] Testing And Overall Quality Practices
  - [x] At the very least, write API (component) testing
  - [x] Include 3 parts in each test name
  - [x] Structure tests by the AAA pattern
  - [x] Detect code issues with a linter
  - [x] Avoid global test fixtures and seeds, add data per-test
  - [x] Constantly inspect for vulnerable dependencies
  - [ ] Tag your tests
  - [ ] Check your test coverage, it helps to identify wrong test patterns
  - [x] Inspect for outdated packages
  - [x] Use production-like environment for e2e testing
  - [ ] Refactor regularly using static analysis tools
  - [x] Carefully choose your CI platform (Jenkins vs CircleCI vs Travis vs Rest of the world)
  - [ ] Test your middlewares in isolation
- [ ] Docker Best Practices
  - [x] Use multi-stage builds for leaner and more secure Docker images
  - [x] Bootstrap using `node` command, avoid `npm start`
  - [ ] Let the Docker runtime handle replication and uptime
  - [x] Use .dockerignore to prevent leaking secrets
  - [x] Clean-up dependencies before production
  - [ ] Shutdown smartly and gracefully
  - [ ] Set memory limits using both Docker and v8
  - [x] Plan for efficient caching
  - [x] Use explicit image reference, avoid latest tag
  - [x] Prefer smaller Docker base images
  - [x] Clean-out build-time secrets, avoid secrets in args
  - [ ] Scan images for multi layers of vulnerabilities
  - [ ] Clean `NODE_MODULE` cache
  - [x] Generic Docker practices
  - [ ] Lint your Dockerfile

If you wish to learn more about this architecture and how you may use or extend this project according to your needs, checkout my [blog post](https://blog.farhan.dev/rock-solid-express-application-architecture) on [https://blog.farhan.dev](https://blog.farhan.dev) and as usual, quality contributions are welcomed.
