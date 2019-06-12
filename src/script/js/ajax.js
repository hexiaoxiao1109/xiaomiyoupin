function ajax(obj) {
    var promise = new Promise(function (resolve, reject) {
        function objtostring(object) {
            var arr = [];
            for (var attr in object) {
                arr.push(attr + '=' + object[attr]);
            }
            return arr.join('&');
        }
        var ajax = new XMLHttpRequest();
        obj.type = obj.type || 'get';
        if (!obj.url) {
            throw new Error('请输入接口地址');
        }
        if (obj.async == false || obj.async == 'false') {
            obj.async = false;
        } else {
            obj.async = true;
        }
        if (obj.data) {
            if (typeof obj.data == 'object' && !Array.isArray(obj.data)) {
                obj.data = objtostring(obj.data);
            } else if (typeof obj.data == 'string') {
                obj.data = obj.data;
            }
        }
        if (obj.data && obj.type == 'get') {
            obj.url += '?' + obj.data;
        }
        ajax.open(obj.type, obj.url, obj.async);
        if (obj.data && obj.type == 'post') {
            ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            ajax.send(obj.data);
        } else {
            ajax.send();
        }
        if (obj.async) {
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200) {
                        resolve(ajax.responseText);
                    } else {
                        reject('接口地址有误' + ajax.status);
                    }
                }
            }
        } else {
            if (ajax.status == 200) {
                resolve(ajax.responseText);
            } else {
                reject('接口地址有误' + ajax.status);
            }
        }
    });
    return promise;//证明调用函数，结果是promise对象。
}