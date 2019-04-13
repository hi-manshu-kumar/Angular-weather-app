app.factory("authFactory", function($http, $cookies, $q){
    const object = {
        login (email, password) {
            let defered = $q.defer();

            $http.post('api/users/login', {
                "email": email,
                "password": password
            }).then(data => {
                if(data.status === 200){
                    defered.resolve(data);
                } else {
                    defered.reject(data);
                }
            }, err => {
                defered.reject(err);
            });

            return defered.promise;
        },

        register (email, password) {
            let defered = $q.defer();
            $http.post('api/users/register', {
                "email"   : email,
                "password": password,
                "name"    : name,
                "lastname": lastname
            }).then(data => {
                if(data.status === 200 ){
                    defered.resolve(data);
                }else {
                  defered.reject(data);
                }
            }, err => {
                defered.reject(err);
            });

            return defered.promise;
        },

        logout () {
            let defered = $q.defer();
            $http.get('api/users/logout')
            .then(data => {
                if( data.status === 200){
                    defered.resolve(data);
                } else{
                    defered.reject(data);
                }
            }, err => {
                defered.reject(err);
            });
            
            return defered.promise;
        },

        authCheck() {
            let defered = $q.defer();
            $http.get('api/users/auth')
            .then(data => {
                if(data.status === 200 && data.data.isAuth) {

                    defered.resolve(data);
                } else {
                    defered.reject(data);
                }
            }, err => {
                defered.reject(err);
            });
            
            return defered.promise;
        },

        addPost(img, title, description) {
            let defered = $q.defer();
            $http.post('/post',{
                    "myImage": img,
                    "title": title,
                    "description":  description},{
                headers: {
                    'x-auth': $cookies.get('token'),
                    enctype:'multipart/form-data'
                }
            }).then(data => {
                if(data.status === 200) {
                    defered.resolve(data);
                } else {
                    defered.reject(data);
                }
            }, err => {
                defered.reject(err);
            });
            
            return defered.promise;
        },

        getPost() {
            let defered = $q.defer();
            $http.get('/post',{
                headers: {
                    'x-auth': $cookies.get('token'),
                }
            }).then(data => {
                if(data.status === 200) {
                    defered.resolve(data);
                } else {
                    defered.reject(data);
                }
            }, err => {
                defered.reject(err);
            });
            
            return defered.promise;
        }
    }

    return object;
})