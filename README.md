实现效果：
创建test-app项目
package.json新增两个依赖： rxjs vue-rx；
main.js新增 import VueRx from 'vue-rx';  Vue.use(VueRx);
src/components 新增RxExample.vue文件；

test-app测试项目怎么引入本地plugin：
npm install --save-dev file://githubRopo/vue-cli-plugin-rxhan (两个文件都在githubRopo文件夹下的)
vue invoke vue-cli-plugin-rxhan、

踩坑点：
插件项目名称必须是 vue-cli-plugin-***
检查插件的package.json的name，test-app的package.json的devDependencies引入的名称
把template目录下所有文件复制过去