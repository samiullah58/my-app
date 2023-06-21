const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("user").readOwn("User").updateOwn("User");

  ac.grant("admin")
    .extend("user")
    .updateAny("User")
    .deleteAny("User")
    .readAny("User");

  return ac;
})();
