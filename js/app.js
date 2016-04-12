(function () {
    angular.module('recsuit.controllers', []);

    var dependencies = [
        'ui.router',
        'ui.bootstrap',
        'ngSanitize',
        'ngStorage',
        'pascalprecht.translate',
        'recsuit.core',
        'recsuit.common',
        'recsuit.controllers',
        'recsuit.home'
    ];

    angular.module('recsuit', dependencies).run(["$translate", "$rootScope", function($translate, $rootScope) {
        var language = window.navigator.userLanguage || window.navigator.language || 'en-US';
        $translate.use(language);

        $rootScope.logged = {
            name: 'Leonardo Salles'
        };
    }])
    .factory('sceStrategy', ["$sce", function ($sce) {
        return function (value, mode) {
            if (mode === 'text') {
                var result = '';
                result = $sce.trustAsHtml(value);
                if (result.$unwrapTrustedValue) {
                    result = result.$unwrapTrustedValue();
                }
                value = result;
            }
            return value;
        };
    }])
    .config(["$urlRouterProvider", "$translateProvider", "$translateSanitizationProvider", function($urlRouterProvider, $translateProvider, $translateSanitizationProvider) {
        for (var i=0,n=window.availableTranslates.length; i<n; i++) {
            $translateProvider.translations(window.availableTranslates[i], window.translates[window.availableTranslates[i]]);
        }

        $translateSanitizationProvider.addStrategy('sce', 'sceStrategy');
        $translateProvider.useSanitizeValueStrategy('sce');

        $urlRouterProvider.otherwise('/home');
    }]);

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['recsuit']);
    });
})();
(function () {
    HomeController.$inject = ["$timeout", "$rootScope"];
    angular.module('recsuit.controllers').controller('HomeController', HomeController);

    function HomeController ($timeout, $rootScope) {
        var vm = this;

        vm.teste = 'Teste';
    }
})();

(function () {
    HomeModule.$inject = ["$stateProvider"];
    angular.module('recsuit.home', []).config(HomeModule);

    function HomeModule ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'app/home/home.html',
            controller: 'HomeController as vm'
        });
    }
})();

(function () {
    angular.module('recsuit.core', []);
})();

(function () {
    angular.module('recsuit.common', []);
})();

(function () {
   window.translates = {};
    window.availableTranslates = ['en-US', 'pt-BR'];

    window.translates['en-US'] = {
        common: {
            logout: 'Logout'
        }
    };
})();

(function () {
   window.translates['pt-BR'] = {
        common: {
            logout: 'Sair'
        }
   };
})();
