export const firebaseAuthStub = {
    successful: true,
    createUserWithEmailAndPassword(email: string, password: string){
        return new Promise((resolve, reject) => {
            if(email == 'user@mail.com' && password == 'secret'){
                return resolve(true);
            }

            reject(false);
        });
    },
    currentUser: {
        updateProfile(value: any){
            return new Promise((resolve, reject) => {
                resolve(true);
            });
        }
    },
    signInWithEmailAndPassword(email: string, password: string){
        return new Promise((resolve, reject) => {
            if(email == 'user@mail.com' && password == 'secret'){
                return resolve(true);
            }

            reject(false);
        });
    },
    onAuthStateChanged(callback){
        if(this.successful){
            callback({
                name: 'Test User',
                provider: 'password'
            });
        }else{
            callback(undefined);
        }
    }
};

export const AuthProviderStub = {
    successful: true,
    addScope(scope: string){}
};
