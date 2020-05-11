(function() {
    (function() {
      var WebClient;
      WebClient = require("@slack/client").WebClient;
      module.exports = function(robot) {
        return robot.hear(/cookie (.*) (.*) (.*) (.*) (.*)/i,async function(res) {
          try 
          {
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
          notification_room = res.message.rawMessage.channel;
	console.log(res.message.user.id);
	console.log(res.message.room);
	if (notification_room != null && ( res.message.room == 'CU14C237V' || res.message.user.id == 'UU01SURU2' || res.message.user.id == 'UU01SURU2')) {
  //        console.log("there is no error");  
          var host, job, jobs, pid, earliest, latest, service, splunkjs, searchQuery, envi;
          job = void 0;
          host = void 0;
          pid = void 0;
          host = res.match[1];
          pid = res.match[2];
          envi = res.match[3];
          earliest = res.match[4];
          latest = res.match[5];
          jobs = void 0;
          service = void 0;
          splunkjs = void 0;
          splunkjs = require('splunk-sdk');
          jobs = void 0;
          if(envi == "prd") {
            service = new splunkjs.Service({
              username: 'admin',
              password: 'Welcome@123',
              host: '18.216.93.118',
              port: '8089'
            });
            } else {
            service = new splunkjs.Service({
              username: 'admin',
              password: 'administrator',
              host: '3.135.199.62',
              port: '8089'
            });
            }  
            var log_in = await callservicelogin();
            
            function callservicelogin()
            {
            service.login(function(err, success) {
            var searchParams;
            
            console.log('Login was successful: ' + success);
             searchQuery = "search host="+host+" source="+pid;
             console.log(searchQuery);
          
            //searchQuery = 'search host=' + hostnamePattern + ' ' + receiver ' earliest=' + earliest + ' latest=' + latest  
            searchParams = {
              exec_mode: 'normal',
              earliest_time: earliest,
              latest_time: latest
            };
            service.search(searchQuery, searchParams, function(err, job) {
              service.jobs().fetch(function(err, jobs) {
                var jobList;
                jobList = void 0;
                jobList = jobs.list();
                jobs = jobList[0];
                job = JSON.stringify(jobs);
                jobs.track({
                  period: 200
                }, {
                  done: function(job) {
                    var stat;
                    stat = jobs.properties();
 			console.log(stat);                   
                    jobs.results({}, function(err, results, job) {
                      var AWS, finalPath, fold1, fold2, fold3, params, s3;
                      fold1 = stat.defaultSaveTTL;
                      fold2 = stat.defaultTTL;
                      fold3 = stat.diskUsage;
                      finalPath = fold1 + '/' + fold2 + '/' + fold3;
                      AWS = require('aws-sdk');
                    //AWS.config.loadFromPath('./aws-config.json');
                      s3 = new AWS.S3;
                      params = {
                       Bucket: 'test-hubot',
                       Key: finalPath
                     };
                     s3.deleteObject(params, function(err, data) {
                       if (err) {
                         console.log(err, err.stack);
                       } else {
                         console.log();
                       }
                     });
                     res.reply('successfully deleted the cookie');
                     return res.send(finalPath);
                        
                     // return res.reply(JSON.stringify(stat));
                      //return res.send(stat);
                    });
                  },
                  failed: function(job) {
                    console.log('Job failed');
                  },
                  error: function(err) {
                    done(err);
                  }
                });
              });
            });
          });
          }
          output = "The splunk query is  "+searchQuery+" by user <@"+res.message.user.name+">"  + "'\n";
          console.log(output);
          const fs = require('fs')
          fs.appendFile('/home/centos/javacoffee/OutputLog.txt', output, function(err)  {
          if (err) console.log(err);
          })
          var AWS = require('aws-sdk');
          var s3 = new AWS.S3();
          var myBucket = 'mytestingsync';
          
          var myKey = 'Test1/Output.txt';
          fs.readFile('/home/centos/javacoffee/OutputLog.txt', function (err, data) {
           if (err) { console.log(err); }
           params = {Bucket: myBucket, Key: myKey, Body: data };
           s3.putObject(params, function(err, data) {
            if (err) {
               console.log(err)
            } else {
           console.log("Successfully uploaded data to myBucket/myKey");
                    }
           });
           });
           return res.reply(output);
           
      } //if condition for the notification room is closed
      else {
          return res.reply("invalid message room");
          } //closing the else condition
        } catch(err) { console.log(err); }
        });
      };
    }).call(this);
  
  
  }).call(this);
  
  

