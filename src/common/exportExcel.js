var formatJson=function(filterVal,jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
};

var exportExcel=function(name,tHeader,filterVal,list) {
    require.ensure([], () => {
　　　　const { export_json_to_excel } = require('../assets/js/vendor/Export2Excel.js');
　　　　const data = formatJson(filterVal, list);
　　　　export_json_to_excel(tHeader, data, name);
    })
}

export default exportExcel
