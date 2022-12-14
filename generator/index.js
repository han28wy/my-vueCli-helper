// generator/index.js
module.exports = (api, options, rootOptions) => {
// 向package.json里添加依赖
  api.extendPackage({
    dependencies: {
      'rxjs': "^6.3.3",
      'vue-rx': "^6.1.0",
    },
    scripts: {
        greet: 'vue-cli-service greet'
    }
  });

  let rxLines = `\nimport VueRx from 'vue-rx';\n\nVue.use(VueRx);`;

  api.onCreateComplete(() => { // 在文件写入磁盘时调用它
    const fs = require('fs');
    const mainPath = api.resolve('./src/main.js');
    // 获取内容
    let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' });
    const lines = contentMain.split(/\r?\n/g).reverse();
    // 注入import
    const lastImportIndex = lines.findIndex(line => line.match(/^import/));
    lines[lastImportIndex] += rxLines;
    // 修改应用
    contentMain = lines.reverse().join('\n');
    fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' });
  });

  
  if (options.addExample) {
    api.render("./template", {
      ...options,
    });
  }
};

// api.render('./template') 是创建新的模板， 将会使用 EJS 渲染 ./template 中的文件 
// (相对于 generator 中的文件路径进行解析)

// api.extendPackage 向项目中添加额外的依赖，创建npm脚本，或者修改package.json

// api.injectImports(api.entryFile, `import router from './router'`)
// 修改main.js main.ts injectImports 用于添加新的导入到主文件中：

// api.afterInvoke这个钩子将在文件被写入硬盘之后被调用
// api.afterInvoke(() => {
//     const fs = require('fs')
//     const contentMain = fs.readFileSync(api.resolve(api.entryFile), { encoding: 'utf-8' })
//     const lines = contentMain.split(/\r?\n/g)

// const renderIndex = lines.findIndex(line => line.match(/render/))
//     lines[renderIndex] += `\n router,`
// 内容写入主文件
// fs.writeFileSync(api.entryFile, lines.join(EOL), { encoding: 'utf-8' })
//   })