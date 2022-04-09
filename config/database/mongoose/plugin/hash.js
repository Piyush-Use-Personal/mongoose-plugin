const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

module.exports = exports = function hashField(schema) {
    schema.methods.hashField = function (fieldName) {
        let self = this;
        return new Promise((resolve, reject) => {
            // generate a salt
            bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
                if (err) return reject(err);

                // hash the password using our new salt
                bcrypt.hash(self[fieldName], salt, async (err, hash) => {
                    if (err) return reject(err);
                    // override the cleartext password with the hashed one
                    self[fieldName] = hash;
                    await self.save()
                    resolve()
                });
            });
        })

    };
}