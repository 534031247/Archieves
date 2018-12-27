# Vue项目搭建过程

## install vue-cli

> An insignificant but time-consuming phase of our project's lifecycle is **setting up and tooling**. There's a lot of terms to understand and digest -- webpack, SystemJS, bundling, linting, uglifying, etc. A CLI tool helps you automate the process of setting up your project environment from development, to testing and even as far as production.

```bash
npm install -g vue-cli
```



## Creating a Project

The syntax is ```vue init [template][project-name]```

e.g.	

```bash
vue init webpack project-name
```

You need to install the dependencies generated in the `package.json`. To do that, enter the `project` folder and run the install command:

```bash
cd project
npm install
```



## Run Project

```bash
npm run dev
```

