(function() {
    var WebClient;
    WebClient = require("@slack/client").WebClient;
  
    module.exports = function(robot) {
      var room;
      var output;
      var default_channel_name, notification_room, web;
      web = new WebClient(robot.adapter.options.token);
      notification_room = void 0;
      default_channel_name = "general";
      web.channels.list().then(function(api_response) {
        room = api_response.channels.find(function(channel) {
          return channel.name === default_channel_name;
        });
        if (room != null) {
          return notification_room = room.id;
        }
      })["catch"](function(error) {
        return robot.logger.error(error.message);
      });
  
      return robot.hear(/service (.*) (.*) (.*)/i, function(res) {
        var service,host;
        const fs = require('fs')
           host = res.match[3];
           service = res.match[2];
           operation = res.match[1];
          
         condition = require('../libs/checking_user_and_room.js');
        if (notification_room != null && (condition(res.message.user.id,res.message.room) == "true"))
        {
          action = require('../libs/operation_on_service.js');
          action(service,operation,host);
        
        myoutput = require('../libs/pushing_output_to_aws.js');
        return robot.messageRoom(room.id, operation+"ed the "+service+" in machine "+host+" by user <@"+res.message.user.name+">");
        }
          else {
  return res.reply("invalid message room");
  }
            });
    };
  
  }).call(this);
  
  
