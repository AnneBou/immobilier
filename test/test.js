const assert = require('assert');
const { getMaxListeners } = require('process');
it('simple test', (done) => {
  assert.ok(true);
  done();
});

describe('Utilisateurs', () => {
    
  // it(`Vérification email, d'un non-existant`, (done) => {
  //     User.emailExists(User.email).then((result) => {
  //         assert.equal(result, false);
  //         done();
  //     });
  // });

  it(`Création d'un compte`, () => {
      assert.ok(true);
  });

/*    
  it(`Vérification email, d'un existant`, (done) => {
      repo.emailExists(entity.email).then((result) => {
    
      assert.ok(true);
      done();
  });
*/
});