(function() {
  module.exports = function(robot) {
    robot.commands.push("hubot splunk <host> <source> <environment> <earliest_time> <latest_time> - Hubot searches the splunk query");
    robot.commands.push("hubot cookie <host> <source> - hubot deletes s3 file");
    robot.commands.push("hubot service <operation> <service_name> <host> - hubot starts|stops|restarts the service on the host");
    return robot.commands.push("hubot rotatekeys <user> - hubot rotates the keys of the user");
  };

}).call(this);
