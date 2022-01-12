'use strict';

exports.ok = function(values, res){
    var data = {
        'status': 200,
        'values': values
    }

    res.json(data);
    res.end();
}

exports.fail = function(values, res){
    var data = {
        'status': 404,
        'values': values
    }

    res.json(data);
    res.end();
}

exports.nested = function(values, res){
    // accumulate
    const hasil = values.reduce((accumulate, item) => {
        // key group
        if(accumulate[item.nama]){
            // create variable group
            let group = accumulate[item.nama];
            // check is array data
            if(Array.isArray(group.matakuliah)){
                // add value to group
                console.log(item.matakuliah);
                group.matakuliah.push(item.matakuliah);
            }else{
                group.matakuliah = [group.matakuliah, item.matakuliah]
                console.log(item.matakuliah);
            }
        }else{
            accumulate[item.nama] = item;
        }
        return accumulate;
    },{});

    var data = {
        'status': 200,
        'values': hasil
    }

    res.json(data);
    res.end();
}