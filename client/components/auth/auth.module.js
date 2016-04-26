'use strict';

angular.module('poollogApp.auth', [
  'poollogApp.constants',
  'poollogApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
