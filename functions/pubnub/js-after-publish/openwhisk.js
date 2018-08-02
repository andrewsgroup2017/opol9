export default (request) => { 
    const xhr = require('xhr');

    // TODO: base64 encoded key
    const base64_encoded_key = "";

    // IBM DOCS: https://console.ng.bluemix.net/apidocs/98?&language=shell_curl#get-all-triggers

    // GET ALL TRIGGERS
    // WARNING: YOU SHOULD DO SOMETHING WITH RETURNED DATA
    // {
    //     "openwhisk": {
    //         "method": "GET",
    //         "namespace": "my_namespace"
    //     }
    // }
    
    // DELETE A TRIGGER
    // {
    //     "openwhisk": {
    //         "method": "DELETE",
    //         "namespace": "my_namespace",
    //         "triggerName": "my_trigger"
    //     }
    // }
    
    // GET TRIGGER INFORMATION
    // WARNING: YOU SHOULD DO SOMETHING WITH RETURNED DATA
    // {
    //     "openwhisk": {
    //         "method": "GET",
    //         "namespace": "my_namespace",
    //         "triggerName": "my_trigger"
    //     }
    // }


    // FIRE A TRIGGER
    // {
    //     "openwhisk": {
    //         "method": "POST",
    //         "namespace": "my_namespace",
    //         "triggerName": "my_trigger"
    //         "triggerPayload": {"some": "value"}
    //     }
    // }
    
    // GET ALL ACTIONS
    // WARNING: YOU SHOULD DO SOMETHING WITH RETURNED DATA
    // {
    //     "openwhisk": {
    //         "method": "GET",
    //         "namespace": "my_namespace"
    //     }
    // }
    
    // DELETE AN ACTION
    // {
    //     "openwhisk": {
    //         "method": "DELETE",
    //         "namespace": "my_namespace",
    //         "actionName": "my_action"
    //     }
    // }
    
    // GET ACTION INFORMATION
    // WARNING: YOU SHOULD DO SOMETHING WITH RETURNED DATA
    // {
    //     "openwhisk": {
    //         "method": "GET",
    //         "namespace": "my_namespace",
    //         "actionName": "my_action"
    //     }
    // }


    // FIRE AN ACTION
    // {
    //     "openwhisk": {
    //         "method": "POST",
    //         "namespace": "my_namespace",
    //         "actionName": "my_action"
    //         "payload": {"some": "value"},
    //         "blocking": true
    //     }
    // }
    
    // UPDATE AN ACTION (CREATE IF NOT EXIST)
    // {
    //     "openwhisk": {
    //         "method": "PUT",
    //         "namespace": "tomasz@pubnub.com_dev",
    //         "actionName": "whateverAction",
    //         "payload": {
    //             "version": "1.0.0",
    //             "exec": {
    //                 "code": "print('Hello, world!')",
    //                 "kind": "swift"
    //             }
    //         }
    //     }
    // }
    
    const namespace   = request['message']['openwhisk']['namespace'];
    const triggerName = request['message']['openwhisk']['triggerName'];
    const actionName  = request['message']['openwhisk']['actionName'];
    const key         = request['message']['openwhisk']['key'];
    const overwrite   = request['message']['openwhisk']['overwrite'];
    const payload     = request['message']['openwhisk']['payload'];
    const method      = request['message']['openwhisk']['method'];
    const blocking    = request['message']['openwhisk']['blocking'];
    
    const options = {
      "method": method,
      "body": payload,
      "headers": {
        "content-type": "application/json",
        "Authorization": "Basic " + base64_encoded_key
      }
    };

    var url;

    if(triggerName){
        url = 'https://openwhisk.ng.bluemix.net/api/v1/namespaces/' + namespace + "/triggers/" + triggerName;
    } else if(actionName) {
        url = 'https://openwhisk.ng.bluemix.net/api/v1/namespaces/' + namespace + "/actions/" + actionName;
    } else {
        url = 'https://openwhisk.ng.bluemix.net/api/v1/namespaces/' + namespace;
    }
    
    if(typeof overwrite !== 'undefined'){
        url += "?overwrite=" + overwrite;
    }
    
    if(typeof blocking !== 'undefined'){
        url += "?blocking=" + blocking;
    }
    
    console.log(method + " " + url);
    
    xhr.fetch(url, options).then((x) => {
        // YOU CAN DO SOMETHING WITH RETURNED VALUE HERE

        const body = JSON.parse(x.body);
        console.log(body);
        return request.ok();
    })
    .catch((e) => {
        console.error(e);
        return request.ok();
    });
}