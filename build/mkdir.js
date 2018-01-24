const fs = require('fs'); 

var mkdir = (dir, cb) => {
	try { fs.mkdirSync(dir) } catch (e){ cb && cb(e) }
}

module.exports = mkdir; 