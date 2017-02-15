const path = require('path');
class Constants {
	constructor() {
		this.app_root_dir = process.cwd();
		this.imgUploadDirName = "uploads";
		this.img_ext = '.webp';
		this.encodeKey = "YQdEAGRf";
	}

	get imgUploadDir() {
		return path.join(this.app_root_dir, this.imgUploadDirName);
	}

	get runPath() {
		return path.join(this.app_root_dir, "utile/run");
	}
}
module.exports = Constants;
