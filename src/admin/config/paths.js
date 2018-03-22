'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(path.join(process.cwd(), 'src/admin/ui'));
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const resolveServerApp = relativePath => path.resolve(process.cwd(), relativePath);
const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(daPath, needsSlash) {
  const hasSlash = daPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return daPath.substr(daPath, daPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${daPath}/`;
  } else {
    return daPath;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl ||
    (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

module.exports = {
  appBuild: resolveServerApp('public'),
  appHtml: resolveApp('index.html'),
  appIndexJs: resolveApp('index.tsx'),
  appNodeModules: resolveApp('node_modules'),
  appPackageJson: resolveApp('tsconfig.json'),
  appPublic: resolveApp('public'),
  appSrc: resolveApp(''),
  appTsConfig: resolveApp('tsconfig.json'),
  appTsLint: resolveServerApp('tslint.json'),
  dotenv: resolveApp('.env'),
  publicUrl: getPublicUrl(resolveApp('tsconfig.json')),
  servedPath: getServedPath(resolveApp('tsconfig.json')),
  yarnLockFile: resolveServerApp('yarn.lock'),
};
