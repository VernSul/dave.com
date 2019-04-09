const axios = require('axios');;
const expect = require('expect');

const req = {
    bear_type: 'grizzly',
    zip_code: 90013,
    num_bears: 3,
    notes: 'Was wearing a blue jacket.',
};

it('should record bear sight data', (done) => {
    axios.post('http://localhost:4000/sighting', req).then((resp, err) => {
        if(err) console.log(err);
        expect(resp.data).toMatchObject(req);
        done();
    });
});


it('should return a single sighting object queried by one parameter', (done) => {
    axios.get('http://localhost:4000/sighting/search?notes=Was wearing a blue jacket.').then((resp, err) => {
        if(err) console.log(err);
        expect(resp.data[0]).toMatchObject(req);
        done();
    });
});


it('should return a single sighting object queried by multiple parameter', (done) => {
    axios.get('http://localhost:4000/sighting/search?notes=Was wearing a blue jacket.&bear_type=grizzly&num_bears=3').then((resp, err) => {
        if(err) console.log(err);
        expect(resp.data[0]).toMatchObject(req);
        done();
        });
    });

it('should return a sights array sorted by num_bears', (done) => {
            axios.get('http://localhost:4000/sighting/search?bear_type=grizzli&sort=true').then((resp, err) => {
                if(err) console.log(err);
                let check = true;
                for(let i = 1; i < resp.data; i++){
                    if(resp.data[i] < resp.data[i-1]) check = false;
                }
                expect(check).toEqual(true);
                done();
                });
            });

it('should return a single sighting object queried by its id', (done) => {
    setTimeout(() => {
        return axios.get('http://localhost:4000/sighting/6').then((resp, err) => {
            if(err) console.log(err);
            expect(resp.data[0]).toMatchObject(req);
            done();
            });
        }, 3000);

        
    });
  
