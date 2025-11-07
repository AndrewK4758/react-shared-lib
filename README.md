# Btg

## Custom UI Kit

### Structure

- Nx Monorepo
  
  Pros:
  
  * All apps/libs are using same dependencies
  * Central repository where we can organize multiple projects/versions 
  * Not just TS/JS
  * Local cache for faster build times
  * Utilizes most current best practices
  * Standardized cli commands that are extendable
  * Monorepo is **EXACTLY** the kind of stucture that llm needs as context
  * Nx modified the schemas they use to be LLM forward (local or cloud)
  * Faster CI
  * **EXCELLENT** documentation
  * No restrictions on Front/Back end 
  * Built in unit/e2e testing
  * They provide options for all aspects of dev (no lock-in)
  * We can keep the apps / features of internal and shared (Dilly) within
  * Everyone working in the monorepo will have the changes immediately, only new build is necessary. If working on project outside of the monorepo, just need to ```pnpm i``` for latest versions of library elements

  Cons:

  * A little bit of a learning curve
  * Creating plugins or custom functionality can be more involved
  * See general monorepo frustrations 

- PNPM

  * Faster than npm
  * More security
  * Less space used on local machine

- Prettier / EsLint

### Front End

  * **React**
  * **Vite**
  * **Typescript**
  * **Vitest** (unit, component, page)
  * **Playwright** (e2e)
  * **Storybook** (e2e - focus on styling)

##### Plugins (not all)

[plugins](https://nx.dev/docs/plugin-registry)


### How to use 

 - Install Nx VsCode plugin
 - Open the package.json of the lib or app and abouve the "nx" property field there will be options that appear that handle and explain all aspects of the build/publish process
 - Run the local verdaccio server is ```nx run local-registry``` and open the localhost link, then follow 3 onscreen instructions to add user to npm registry, publish, and download and use
 - Please feel free to reach out to me to go over this in more detail
