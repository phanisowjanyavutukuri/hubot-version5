  //================ splunk login
  module.exports  = function login(env,searchQuery,earliest_time,latest_time,callback) {
    var envi = env;
    var mystat, stat;
    var obj = {stat: null}
    var earliest_time = earliest_time;
    var latest_time = latest_time;
    var searchQuery = searchQuery;
    splunkjs = require('splunk-sdk');
    if(envi = "prd") {
        service =  new splunkjs.Service({
          username: 'admin',
          password: 'Welcome@123',
          host: '52.15.88.197',
          port: '8089'
        });
        console.log("this is service")
        }
        else 
        service = new splunkjs.Service({
          username: 'admin',
          password: 'administrator',
          host: '3.135.199.62',
          port: '8089'
        });
        
        // return new Promise( ()=>{
    service.login(function(err, success) {
        var searchParams, searchQuery;
        if (err) {
          throw err;
          
        }
        searchParams = {
          exec_mode: 'normal',
          earliest_time: earliest_time,
          latest_time: latest_time
        };

        console.log('Login was successful: ' + success);
        service.search(searchQuery, searchParams, function(err, job) {
       service.jobs().fetch(function(err, jobs) {
        var jobList;
        console.log("entered fetch")
        jobList = void 0;
        jobList = jobs.list();
        jobs = jobList[0];
        job = JSON.stringify(jobs);
        mystat = jobs.properties()
        obj.stat=jobs.properties();
        jobs.track({
           period: 200
             }, {
                  done: function(job) {
                    
                    stat = jobs.properties();
                    mystat = stat;
                    console.log("this is from track func");
                    callback(stat);
                    //setGlobal(stat);
                   //console.log(typeof stat + "*************");
                    return stat;
                   //return JSON.stringify(stat);
                  },
                  failed: function(job) {
                    console.log('Job failed');
                  },
                  error: function(err) {
                    done(err);
                  } 
                });
              });

             //return stat) ;
            }); 
          //  console.log("this is second"+ JSON.stringify(mystat));

             //console.log("this is first"+ mystat);
            
})
console.log("final"+mystat)
return mystat;
        // });
  //       prom.then(res=>{
  //         console.log("resolved"+res)
  //         console.log("this is second"+ JSON.stringify(mystat));
  // console.log("this is fromlogin func"+JSON.stringify(mystat));

  //       }).catch(err=> {
  //         console.log("err"+err)
  //         console.log("this is second"+ JSON.stringify(mystat));
  // console.log("this is fromlogin func"+JSON.stringify(mystat));
  //       })
//await console.log("***********"+ typeof Promise.resolve(stat)+"*****************")
//eturn Promise.resolve(stat) ;
// console.log("obj"+obj.stat);
function setGlobal(val){
  console.log("glob"+JSON.stringify(val));
  mystat = val;
}

}
