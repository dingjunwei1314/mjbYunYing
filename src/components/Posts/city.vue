<template>
    <div style="width:50%;">
        <el-row :gutter="10" class="margin-top">
            <el-col :span="5">
                <el-select v-model="province" placeholder="请选择" filterable @change="provinceChange">
                    <el-option
<<<<<<< HEAD
                            v-for="(key,item) in provinceOptions"
                            :key="item.value"
=======
                            :key="index"
                            v-for="(item,index) in provinceOptions"
>>>>>>> 146183db1db4633020c5b793d55e0de805eb6c8c
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="5">
                <el-select v-model="city" placeholder="请选择" filterable>
                    <el-option
<<<<<<< HEAD
                            v-for="(key,item) in cityOptions"
                            :key="item.value"
=======
                            :key="index"
                            v-for="(item,index) in cityOptions"
>>>>>>> 146183db1db4633020c5b793d55e0de805eb6c8c
                            :label="item.label"
                            :value="item.value">
                    </el-option>

                </el-select>
            </el-col>
        </el-row>
    </div>
</template>
<style>
    .margin-top{
        margin-top:10px;
    }
</style>

<script>
    export default {
        props: ['provinceValue','cityValue'],
        data: function() {
            return {
                province: this.provinceValue,
                city:this.cityValue,
                provinceOptions: [{
                    value: 0,
                    label: '全国'
                },{
                    value: 1,
                    label: '北京市'
                }, {
                    value: 2,
                    label: '天津市'
                }, {
                    value: 3,
                    label: '上海市'
                }, {
                    value: 4,
                    label: '重庆市'
                }, {
                    value: 5,
                    label: '新疆维吾尔自治区'
                },{
                    value: 6,
                    label: '广西壮族自治区'
                },{
                    value: 7,
                    label: '西藏自治区'
                },{
                    value: 8,
                    label: '内蒙古自治区'
                },{
                    value: 9,
                    label: '宁夏回族自治区'
                },{
                    value: 10,
                    label: '河北省'
                },{
                    value: 11,
                    label: '河南省'
                },{
                    value: 12,
                    label: '云南省'
                },{
                    value: 13,
                    label: '辽宁省'
                },{
                    value: 14,
                    label: '黑龙江省'
                },{
                    value: 15,
                    label: '湖南省'
                },{
                    value: 16,
                    label: '安徽省'
                },{
                    value: 17,
                    label: '山东省'
                },{
                    value: 18,
                    label: '江苏省'
                },{
                    value: 19,
                    label: '浙江省'
                },{
                    value: 20,
                    label: '江西省'
                },{
                    value: 21,
                    label: '湖北省'
                },{
                    value: 22,
                    label: '甘肃省'
                },{
                    value: 23,
                    label: '山西省'
                },{
                    value: 24,
                    label: '陕西省'
                },{
                    value: 25,
                    label: '吉林省'
                },{
                    value: 26,
                    label: '福建省'
                },{
                    value: 27,
                    label: '贵州省'
                },{
                    value: 28,
                    label: '广东省'
                },{
                    value: 29,
                    label: '青海省'
                },{
                    value: 30,
                    label: '四川省'
                },{
                    value: 31,
                    label: '海南省'
                },{
                    value: 32,
                    label: '台湾省'
                },{
                    value: 33,
                    label: '香港特别行政区'
                },{
                    value: 34,
                    label: '澳门特别行政区'
                }],
                cityOptions:[{"value":"全国"}]
            }
        },
        methods: {
            provinceChange(val){
                let vm = this;
                switch(val){
                    case 0:
                        vm.cityOptions = [{"value":"全国"}];
                        break;
                    case 1:
                        vm.cityOptions = [
                            {"value":"北京市"},
                            {"value":"东城区"},
                            {"value":"西城区"},
                            {"value":"朝阳区"},
                            {"value":"丰台区"},
                            {"value":"石景山区"},
                            {"value":"海淀区"},
                            {"value":"其他"}
                        ];
                        break;
                    case 2:
                        vm.cityOptions = [
                            {"value":"天津市"},
                            {"value":"和平区"},
                            {"value":"河东区"},
                            {"value":"河西区"},
                            {"value":"南开区"},
                            {"value":"河北区"},
                            {"value":"红桥区"},
                            {"value":"其他"}
                        ];
                        break;
                    case 3:
                        vm.cityOptions = [
                            {"value":"上海市"},
                            {"value":"黄浦区"},
                            {"value":"徐汇区"},
                            {"value":"长宁区"},
                            {"value":"静安区"},
                            {"value":"普陀区"},
                            {"value":"虹口区"},
                            {"value":"杨浦区"},
                            {"value":"浦东新区"},
                            {"value":"其他"}
                        ];
                        break;
                    case 4:
                        vm.cityOptions = [
                            {"value":"重庆市"},
                            {"value":"渝中区"},
                            {"value":"江北区"},
                            {"value":"南岸区"},
                            {"value":"九龙坡区"},
                            {"value":"沙坪坝区"},
                            {"value":"大渡口区"},
                            {"value":"北碚区"},
                            {"value":"渝北区"},
                            {"value":"巴南区"},
                            {"value":"其他"}
                        ];
                        break;
                    case 5:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"乌鲁木齐市"},
                            {"value":"克拉玛依市"},
                            {"value":"吐鲁番市"},
                            {"value":"哈密市"}
                        ];
                        break;
                    case 6:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"南宁市"},
                            {"value":"柳州市"},
                            {"value":"桂林市"},
                            {"value":"梧州市"},
                            {"value":"北海市"},
                            {"value":"崇左市"},
                            {"value":"来宾市"},
                            {"value":"贵港市"},
                            {"value":"贺州市"},
                            {"value":"玉林市"},
                            {"value":"百色市"},
                            {"value":"河池市"},
                            {"value":"钦州市"},
                            {"value":"防城港市"}
                        ];
                        break;
                    case 7:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"拉萨市"},
                            {"value":"日喀则市"},
                            {"value":"昌都市"},
                            {"value":"林芝市"},
                            {"value":"山南市"}
                        ];
                        break;
                    case 8:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"呼和浩特市"},
                            {"value":"包头市"},
                            {"value":"乌海市"},
                            {"value":"赤峰市"},
                            {"value":"通辽市"},
                            {"value":"鄂尔多斯市"},
                            {"value":"呼伦贝尔市"},
                            {"value":"巴彦淖尔市"},
                            {"value":"乌兰察布市"}
                        ];
                        break;
                    case 9:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"银川市"},
                            {"value":"石嘴山市"},
                            {"value":"吴忠市"},
                            {"value":"固原市"},
                            {"value":"中卫市"}
                        ];
                        break;
                    case 10:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"石家庄市"},
                            {"value":"唐山市"},
                            {"value":"秦皇岛市"},
                            {"value":"邯郸市"},
                            {"value":"邢台市"},
                            {"value":"张家口市"},
                            {"value":"保定市"},
                            {"value":"承德市"},
                            {"value":"沧州市"},
                            {"value":"廊坊市"},
                            {"value":"衡水市"}
                        ];
                        break;
                    case 11:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"郑州市"},
                            {"value":"开封市"},
                            {"value":"洛阳市"},
                            {"value":"商丘市"},
                            {"value":"安阳市"},
                            {"value":"平顶山市"},
                            {"value":"新乡市"},
                            {"value":"焦作市"},
                            {"value":"许昌市"},
                            {"value":"漯河市"},
                            {"value":"三门峡市"},
                            {"value":"鹤壁市"},
                            {"value":"周口市"},
                            {"value":"驻马店市"},
                            {"value":"南阳市"},
                            {"value":"信阳市"},
                            {"value":"濮阳市"}
                        ];
                        break;
                    case 12:
                        vm.cityOptions = [
                            {"value":"昆明市"},
                            {"value":"全省"},
                            {"value":"曲靖市"},
                            {"value":"玉溪市"},
                            {"value":"保山市"},
                            {"value":"昭通市"},
                            {"value":"丽江市"},
                            {"value":"普洱市"},
                            {"value":"临沧市"}
                        ];
                        break;
                    case 13:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"沈阳市"},
                            {"value":"大连市"},
                            {"value":"鞍山市"},
                            {"value":"抚顺市"},
                            {"value":"本溪市"},
                            {"value":"丹东市"},
                            {"value":"锦州市"},
                            {"value":"营口市"},
                            {"value":"阜新市"},
                            {"value":"辽阳市"},
                            {"value":"盘锦市"},
                            {"value":"铁岭市"},
                            {"value":"朝阳市"},
                            {"value":"葫芦岛市"}
                        ];
                        break;
                    case 14:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"哈尔滨市"},
                            {"value":"齐齐哈尔市"},
                            {"value":"鸡西市"},
                            {"value":"鹤岗市"},
                            {"value":"双鸭山市"},
                            {"value":"大庆市"},
                            {"value":"伊春市"},
                            {"value":"佳木斯市"},
                            {"value":"七台河市"},
                            {"value":"牡丹江市"},
                            {"value":"黑河市"},
                            {"value":"绥化市"}
                        ];
                        break;
                    case 15:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"长沙市"},
                            {"value":"株洲市"},
                            {"value":"湘潭市"},
                            {"value":"衡阳市"},
                            {"value":"邵阳市"},
                            {"value":"岳阳市"},
                            {"value":"张家界市"},
                            {"value":"怀化市"},
                            {"value":"常德市"},
                            {"value":"益阳市"},
                            {"value":"郴州市"},
                            {"value":"永州市"},
                            {"value":"娄底市"}
                        ];
                        break;
                    case 16:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"合肥市"},
                            {"value":"芜湖市"},
                            {"value":"蚌埠市"},
                            {"value":"马鞍山市"},
                            {"value":"安庆市"},
                            {"value":"淮南市"},
                            {"value":"滁州市"},
                            {"value":"铜陵市"},
                            {"value":"亳州市"},
                            {"value":"淮北市"},
                            {"value":"阜阳市"},
                            {"value":"宿州市"},
                            {"value":"六安市"},
                            {"value":"宣城市"},
                            {"value":"黄山市"},
                            {"value":"池州市"}
                        ];
                        break;
                    case 17:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"济南市"},
                            {"value":"青岛市"},
                            {"value":"淄博市"},
                            {"value":"枣庄市"},
                            {"value":"东营市"},
                            {"value":"烟台市"},
                            {"value":"潍坊市"},
                            {"value":"济宁市"},
                            {"value":"泰安市"},
                            {"value":"威海市"},
                            {"value":"日照市"},
                            {"value":"滨州市"},
                            {"value":"德州市"},
                            {"value":"聊城市"},
                            {"value":"临沂市"},
                            {"value":"菏泽市"},
                            {"value":"莱芜市"}
                        ];
                        break;
                    case 18:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"南京市"},
                            {"value":"无锡市"},
                            {"value":"徐州市"},
                            {"value":"常州市"},
                            {"value":"苏州市"},
                            {"value":"南通市"},
                            {"value":"扬州市"},
                            {"value":"镇江市"},
                            {"value":"盐城市"},
                            {"value":"淮安市"},
                            {"value":"泰州市"},
                            {"value":"连云港市"},
                            {"value":"宿迁市"}
                        ];
                        break;
                    case 19:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"杭州市"},
                            {"value":"宁波市"},
                            {"value":"温州市"},
                            {"value":"绍兴市"},
                            {"value":"湖州市"},
                            {"value":"嘉兴市"},
                            {"value":"金华市"},
                            {"value":"衢州市"},
                            {"value":"舟山市"},
                            {"value":"台州市"},
                            {"value":"丽水市"}
                        ];
                        break;
                    case 20:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"南昌市"},
                            {"value":"赣州市"},
                            {"value":"宜春市"},
                            {"value":"吉安市"},
                            {"value":"上饶市"},
                            {"value":"抚州市"},
                            {"value":"九江市"},
                            {"value":"景德镇市"},
                            {"value":"萍乡市"},
                            {"value":"新余市"},
                            {"value":"鹰潭市"}
                        ];
                        break;
                    case 21:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"武汉市"},
                            {"value":"黄石市"},
                            {"value":"十堰市"},
                            {"value":"荆州市"},
                            {"value":"宜昌市"},
                            {"value":"襄阳市"},
                            {"value":"鄂州市"},
                            {"value":"荆门市"},
                            {"value":"黄冈市"},
                            {"value":"孝感市"},
                            {"value":"咸宁市"},
                            {"value":"随州市"}
                        ];
                        break;
                    case 22:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"兰州市"},
                            {"value":"嘉峪关市"},
                            {"value":"金昌市"},
                            {"value":"白银市"},
                            {"value":"天水市"},
                            {"value":"酒泉市"},
                            {"value":"张掖市"},
                            {"value":"武威市"},
                            {"value":"定西市"},
                            {"value":"陇南市"},
                            {"value":"平凉市"},
                            {"value":"庆阳市"}
                        ];
                        break;
                    case 23:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"太原市"},
                            {"value":"大同市"},
                            {"value":"阳泉市"},
                            {"value":"长治市"},
                            {"value":"晋城市"},
                            {"value":"晋中市"},
                            {"value":"朔州市"},
                            {"value":"运城市"},
                            {"value":"忻州市"},
                            {"value":"临汾市"},
                            {"value":"吕梁市"}
                        ];
                        break;
                    case 24:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"西安市"},
                            {"value":"铜川市"},
                            {"value":"咸阳市"},
                            {"value":"渭南市"},
                            {"value":"汉中市"},
                            {"value":"安康市"},
                            {"value":"商洛市"},
                            {"value":"延安市"},
                            {"value":"榆林市"},
                            {"value":"宝鸡市"}
                        ];
                        break;
                    case 25:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"长春市"},
                            {"value":"吉林市"},
                            {"value":"四平市"},
                            {"value":"辽源市"},
                            {"value":"通化市"},
                            {"value":"白山市"},
                            {"value":"松原市"},
                            {"value":"白城市"}
                        ];
                        break;
                    case 26:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"福州市"},
                            {"value":"厦门市"},
                            {"value":"泉州市"},
                            {"value":"莆田市"},
                            {"value":"漳州市"},
                            {"value":"三明市"},
                            {"value":"南平市"},
                            {"value":"龙岩市"},
                            {"value":"宁德市"}
                        ];
                        break;
                    case 27:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"贵阳市"},
                            {"value":"六盘水市"},
                            {"value":"遵义市"},
                            {"value":"铜仁市"},
                            {"value":"安顺市"},
                            {"value":"毕节市"}
                        ];
                        break;
                    case 28:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"广州市"},
                            {"value":"深圳市"},
                            {"value":"珠海市"},
                            {"value":"汕头市"},
                            {"value":"佛山市"},
                            {"value":"韶关市"},
                            {"value":"湛江市"},
                            {"value":"肇庆市"},
                            {"value":"江门市"},
                            {"value":"茂名市"},
                            {"value":"惠州市"},
                            {"value":"梅州市"},
                            {"value":"汕尾市"},
                            {"value":"河源市"},
                            {"value":"阳江市"},
                            {"value":"清远市"},
                            {"value":"东莞市"},
                            {"value":"中山市"},
                            {"value":"潮州市"},
                            {"value":"揭阳市"},
                            {"value":"云浮市"}
                        ];
                        break;
                    case 29:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"西宁市"},
                            {"value":"海东市"}
                        ];
                        break;
                    case 30:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"成都市"},
                            {"value":"自贡市"},
                            {"value":"攀枝花市"},
                            {"value":"泸州市"},
                            {"value":"德阳市"},
                            {"value":"绵阳市"},
                            {"value":"广元市"},
                            {"value":"遂宁市"},
                            {"value":"内江市"},
                            {"value":"乐山市"},
                            {"value":"南充市"},
                            {"value":"眉山市"},
                            {"value":"广安市"},
                            {"value":"宜宾市"},
                            {"value":"达州市"},
                            {"value":"雅安市"},
                            {"value":"巴中市"},
                            {"value":"资阳市"}
                        ];
                        break;
                    case 31:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"海口市"},
                            {"value":"三亚市"},
                            {"value":"三沙市"},
                            {"value":"儋州市"}
                        ];
                        break;
                    case 32:
                        vm.cityOptions = [
                            {"value":"全省"},
                            {"value":"台北市"},
                            {"value":"新北市"},
                            {"value":"桃园市"},
                            {"value":"台中市"},
                            {"value":"台南市"},
                            {"value":"高雄市"}
                        ];
                        break;
                    case 33:
                        vm.cityOptions = [
                            {"value":"香港"}
                        ];
                        break;
                    case 34:
                        vm.cityOptions = [
                            {"value":"澳门"}
                        ];
                        break;
                };
            }
        }
    }
</script>
<style>
</style>
