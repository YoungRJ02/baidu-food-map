<template>
    <a-card
            style="width: 480px"
            :tab-list="tabList"
            :active-tab-key="key"
            @tabChange="key => onTabChange(key)"
            :hoverable="true"
    >
        <template #title>{{ result.name }}</template>
        <template #extra>
            <a :href="detailInfo.detail_url" target="_blank" title="在百度地图中打开">
                <export-outlined style="color: black"/>
            </a>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <close-outlined @click="closeCard" style="color: black"/>
        </template>

        <template #customTab="item">
            <span v-if="item.key === '概览'">
                {{ item.key }}
            </span>
        </template>

        <div class="tab" v-if="key === 'tab1'">
            <div v-if="detailInfo.content_tag">
                <a-tag color="purple" v-for="tag in detailInfo.content_tag.split(';')">{{ tag }}</a-tag>
            </div>
            <div v-if="result.address"><span class="label"><home-outlined/>&nbsp;&nbsp;地址:&nbsp;&nbsp;</span><span
                    class="info">{{
                result.address
                }}</span>
            </div>
            <div v-if="result.telephone"><span class="label"><phone-outlined/>&nbsp;&nbsp;电话号码:&nbsp;&nbsp;</span><span
                    class="info">
                <a :href="'tel:' + result.telephone">{{ result.telephone }}</a>
            </span></div>
            <div v-if="detailInfo.price"><span class="label"><pay-circle-outlined/>&nbsp;&nbsp;人均消费:&nbsp;&nbsp;¥&nbsp;</span><span
                    class="info">{{
                detailInfo.price
                }}</span>
            </div>
            <div v-if="detailInfo.featured_service"><span class="label"><customer-service-outlined/>&nbsp;&nbsp;服务选项:&nbsp;&nbsp;</span>
                <span class="info" v-for="service in detailInfo.featured_service">
                    <a-tag color="red">{{ service }}</a-tag>
                </span></div>
            <div v-if="detailInfo.atmosphere"><span class="label"><team-outlined/>&nbsp;&nbsp;适合情景:&nbsp;&nbsp;</span>
                <span class="info" v-for="at in detailInfo.atmosphere">
                    <a-tag color="blue">{{ at }}</a-tag>
                </span>
            </div>
        </div>

        <div v-if="key === 'tab2'" class="tab">
            <div v-if="detailInfo.overall_rating"><span class="label">总体评分:&nbsp;&nbsp;</span>
                <a-rate :value="Number(detailInfo.overall_rating)" allow-half disabled/>&nbsp;&nbsp;
                {{ detailInfo.overall_rating }}
            </div>
            <div v-if="detailInfo.taste_rating"><span class="label">美食评分:&nbsp;&nbsp;</span>
                <a-rate :value="Number(detailInfo.taste_rating)" allow-half disabled/>&nbsp;&nbsp;
                {{ detailInfo.taste_rating }}
            </div>
            <div v-if="detailInfo.service_rating"><span class="label">服务评分:&nbsp;&nbsp;</span>
                <a-rate :value="Number(detailInfo.service_rating)" allow-half disabled/>&nbsp;&nbsp;
                {{ detailInfo.service_rating }}
            </div>
            <div v-if="detailInfo.environment_rating"><span class="label">环境评分:&nbsp;&nbsp;</span>
                <a-rate :value="Number(detailInfo.environment_rating)" allow-half disabled/>&nbsp;&nbsp;
                {{ detailInfo.environment_rating }}
            </div>
        </div>

        <div class="tab" v-if="key === 'tab3'">
            <div>
                <a-radio-group v-model:value="transportType" @change="getRoutes">
                    <a-radio-button value="driving">驾车</a-radio-button>
                    <a-radio-button value="riding">骑行</a-radio-button>
                    <a-radio-button value="walking">步行</a-radio-button>
                </a-radio-group>
            </div>
            <div>
                <span class="label">起点:&nbsp;&nbsp;&nbsp;</span>
                <a-select
                        v-model:value="originChoice"
                        style="width: 350px"
                        @change="originChanged"
                >
                    <a-select-option :value="0">中国计量大学</a-select-option>
                    <a-select-option :value="1">在地图拖动以选择...</a-select-option>
                </a-select>
            </div>
            <div>
                <span class="label">终点:&nbsp;&nbsp;&nbsp;</span>
                <a-select
                        :value="result.name"
                        style="width: 350px"
                >
                    <a-select-option :value="result.name">{{ result.name }}</a-select-option>
                </a-select>
            </div>

            <div>
                <span class="label">距离:&nbsp;&nbsp;&nbsp;</span>
                <span v-if="distance < 1000" class="info">{{ distance.toFixed(0) }}&nbsp;米</span>
                <span v-else class="info">{{ (distance / 1000).toFixed(0) }}&nbsp;公里</span>
            </div>

            <div>
                <span class="label">时间:&nbsp;&nbsp;&nbsp;</span>
                <span v-if="duration / 60 < 60" class="info">{{ (duration / 60).toFixed(0) }}&nbsp;分钟</span>
                <span v-else class="info">
                    {{ Math.floor(duration / 60 / 60) }}&nbsp;小时
                    <span v-if="(duration / 60 % 60).toFixed(0) > 0">
                        {{ (duration / 60 % 60).toFixed(0) }}&nbsp;分钟
                    </span>
                </span>
            </div>

            <div v-if="transportType === 'driving'">
                <span class="label">交通状况:&nbsp;&nbsp;&nbsp;</span>
                <span class="info">{{ traffic_condition_str[traffic_condition] }}</span>
            </div>
        </div>

    </a-card>
</template>

<script>
import {getDetailedInfo, getRoutesInfo} from "@/requests";
import closeOutlined from "@ant-design/icons-vue/lib/icons/CloseOutlined";
import exportOutlined from "@ant-design/icons-vue/lib/icons/ExportOutlined";
import homeOutlined from "@ant-design/icons-vue/lib/icons/HomeOutlined";
import phoneOutlined from "@ant-design/icons-vue/lib/icons/PhoneOutlined";
import payCircleOutlined from "@ant-design/icons-vue/lib/icons/PayCircleOutlined";
import customerServiceOutlined from "@ant-design/icons-vue/lib/icons/CustomerServiceOutlined";
import teamOutlined from "@ant-design/icons-vue/lib/icons/TeamOutlined";

export default {
    name: "DetailCard",
    components: {
        closeOutlined,
        exportOutlined,
        homeOutlined,
        phoneOutlined,
        payCircleOutlined,
        customerServiceOutlined,
        teamOutlined,
    },
    props: ['uid', 'location', 'chosenPoint'],
    data() {
        return {
            result: {},
            detailInfo: {},
            tabList: [
                {
                    key: 'tab1',
                    tab: '概览',
                }, {
                    key: 'tab2',
                    tab: '评价',
                }, {
                    key: 'tab3',
                    tab: '出行',
                }
            ],
            key: 'tab1',
            transportType: 'driving',
            traffic_condition_str: ['暂无路况信息', '畅通', '缓行', '拥堵', '严重拥堵'],
            distance: 0,
            duration: 0,
            traffic_condition: 0,
            origin: {lng: '120.369036', lat: '30.327401'},
            destination: {},
            origin_uid: 'd8dba01f8edc68ed3be4a621',
            destination_uid: '',
            originChoice: 0,
        }
    },
    methods: {
        onTabChange(value) {
            this.key = value;
            if (value === 'tab3') {
                this.$emit('showCJLU')
            }
        },
        closeCard() {
            this.$emit('closeCard')
        },
        getDetail(uid) {
            getDetailedInfo(uid)
                .then(res => {
                    this.result = res.data.result
                    this.detailInfo = res.data.result.detail_info

                    this.destination = res.data.result.location
                    this.destination_uid = res.data.result.uid
                    this.getRoutes()
                })
                .catch(err => console.log(err.message))
        },
        getRoutes() {
            getRoutesInfo(
                this.transportType,
                this.origin,
                this.destination,
                this.origin_uid,
                this.destination_uid)
                .then(res => {
                    let route = res.data.result.routes[0]
                    this.distance = route.distance
                    this.duration = route.duration
                    this.traffic_condition = route.traffic_condition
                })
                .catch(err => console.log(err.message))
        },
        originChanged() {
            if (this.originChoice) {
                this.$emit('choosePoint')
            } else {
                this.$emit('showCJLU')
                this.origin = {lng: '120.369036', lat: '30.327401'}
                this.origin_uid = 'd8dba01f8edc68ed3be4a621'
            }
            this.getRoutes()
        },
    },
    mounted() {
        this.getDetail(this.uid)
        this.destination = this.location
        this.destination_uid = this.uid
        this.getRoutes()
    },
    watch: {
        "uid"(newVal) {
            this.getDetail(newVal)
            this.getRoutes()
        },
        "chosenPoint"() {
            if (this.originChoice) {
                this.origin = this.chosenPoint
                this.origin_uid = ''
                this.getRoutes()
            }
        }
    }
}
</script>

<style scoped>
.tab div {
    padding: 8px 0;
}

.label {
    font-weight: bold;
}

</style>
