define(['tests/factories/guestFactory','tests/factories/eventFactory', 'app/model/guest',
    'app/repository/guestRepository', 'libraries/angularMocks'],
    function (GuestFactory, EventFactory, Guest, GuestRepository, AngularMocks) {
        'use strict';

        describe('GuestRepository', function() {
            var event,guest, guestRepository, $http, $httpBackend;

            beforeEach(AngularMocks.inject(function($injector) {
                $http = $injector.get('$http');
                $httpBackend = $injector.get('$httpBackend');

                guestRepository = new GuestRepository($http);
                guest = GuestFactory.createGuest(1);

                event = EventFactory.createEvent(1);

                $httpBackend.when('GET', '/api/events/1/guests/1').respond(guest);
                $httpBackend.when('GET', '/api/events/1/guests/null').respond(404, 'Guest not found.');
                $httpBackend.when('POST','/api/events/1/guests').respond(guest);
            }));

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            describe('get()', function() {
                describe('by object id', function() {
                    it('returns the object', function() {
                        guestRepository.get(1, guest.id, function(newGuest) {
                            expect(guest.id).toEqual(newGuest.id);
                        }, function(){});
                        $httpBackend.flush();
                    });
                });

                describe('by inexistent object id', function() {
                    it('returns null', function() {
                        guestRepository.get(1, null, function() {
                        }, function(error) {
                            expect(error).toEqual('Guest not found.');
                        });
                        $httpBackend.flush();
                    });
                });


            });


            describe('add()', function() {
                it('inserts element', function() {
                    guestRepository.add(event.id, guest, function(newGuest){
                        expect(newGuest.id).toEqual(guest.id);
                    }, function(){});
                    $httpBackend.flush();
                });
            });

        });






    });
