import { TestBed, fakeAsync, tick} from '@angular/core/testing';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { UserService } from './user.service';
import {AngularFireAuthStub} from '../testing/angular-fire-auth-stub';
import {AngularFirestoreStub} from '../testing/angular-firestore-stub';
import {firebaseAuthStub} from '../testing/firebase-stub';

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserService,
                {
                    provide: AngularFirestore,
                    useValue: AngularFirestoreStub
                },
                {
                    provide: AngularFireAuth,
                    useValue: AngularFireAuthStub
                }
            ]
        })

        service = TestBed.get(UserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // functions
    it('getCurrentUser should resolve the promise if user exists', fakeAsync(() => {
        spyOn(firebase, 'auth').and.returnValue(firebaseAuthStub);

        let resolved = false;
        service.getCurrentUser().then(() => {
            resolved = true;
        }).catch(() => {
            resolved = false;
        });
        tick();

        expect(resolved).toBe(true);
    }));

    it('getCurrentUser should reject the promise if user exists', fakeAsync(() => {
        firebaseAuthStub.successful = false;
        spyOn(firebase, 'auth').and.returnValue(firebaseAuthStub);

        let rejected = false;
        service.getCurrentUser().then(() => {
            rejected = false;
        }).catch(() => {
            rejected = true;
        });
        tick();

        expect(rejected).toBe(true);
    }));
});
