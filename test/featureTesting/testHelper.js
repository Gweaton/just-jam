function createProfile(browser) {
  browser
  .fill('name', 'Prince')
  .fill('location', 'Somewhere else')
  .fill('genres', 'Loads')
  .select('select', 'Guitarist')
  .fill('bio', 'he was great');
};

function signUp(browser) {
  browser
    .fill('email', 'prince@prince.com')
    .fill('password', 'password');
};

module.exports = {
  createProfile,
  signUp
}
