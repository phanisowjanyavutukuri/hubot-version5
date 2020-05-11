module.exports = function(service,operation,host){
    service = service;
    operation = operation;
    host = host;
    const fs = require('fs');
    var SSH = require('simple-ssh');
              var ssh = new SSH({
                  host: host,
                  user: 'centos',
                  key: fs.readFileSync("/home/centos/Custom.pem"),
        });
        ssh.exec(`sudo service ${service} ${operation}`,{
            out: function(stdout) {
                console.log(stdout);
            }
        }).start();
}
