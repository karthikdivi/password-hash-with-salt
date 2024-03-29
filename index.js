var crypto = require('crypto');

function createSalt(mode = 'fast') {
  // fastest = 32, fast = 64, secure = 256
  let size = 256;
  if (mode === 'fast') {
    size = 64;
  } else if (mode === 'fastest') {
    size = 32;
  }
  return crypto.randomBytes(size).toString('base64');
}

async function createHash(password, salt, mode = 'fast') {
  let iterations = 10000;
  let keylen = 64;
  let digest = 'sha512';
  if (mode === 'fast') {
    iterations = 1000;
  } else if (mode === 'fastest') {
    iterations = 100;
  }
  let _resolve, _reject, promise = new Promise((resolve, reject) => { _reject = reject; _resolve = resolve; });
  crypto.pbkdf2(password, salt, iterations, keylen, digest, (error, hash) => {
    if (error) {
      console.log(error);
      _reject(error);
    } else {
      _resolve(hash.toString('hex'));
    }
  });
  return promise;
}

exports.generate = async function (password, mode = 'fast') {
  let start = Date.now();
  let salt = createSalt(mode);
  let hash = await createHash(password, salt, mode);
  let end = Date.now();

  return {
    salt, hash,
    time: end - start
  };
}

exports.verify = async function (password, hash, salt, mode = 'fast') {
  let hash2 = await createHash(password, salt, mode);
  return hash2 === hash;
}