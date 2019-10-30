# neweleapp

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# issue

1. goods组件中,better组件中滚动右侧左侧不动的解决方案：
   > good 组件 滚动右侧，左侧不动原因： cube-scroll-nav 组件标签上 缺少v-if来判断数据是否存在,加上之后就好了
2. goods组件中goods类名不加实际高度，盒子并不会因内容而撑开:
   > 原因待解决~~~
