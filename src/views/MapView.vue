<template>
    <div class="layout-container">
        <a-layout>
            <a-layout-sider width="390px" style="background: #fff">
                <a-list item-layout="horizontal" :data-source="list" style="min-height: 650px">
                    <a-list-item v-for="place in list" :key="place.uid" class="item">
                        <template #extra>
                            <list-card :place="place" @click="mouseClicked(place.uid)"/>
                        </template>
                    </a-list-item>

                    <div class="pagination-container">
                        <a-pagination v-model:current="currentPage"
                                      default-page-size="5"
                                      simple
                                      v-model:total="total"
                                      :style="{float: 'none !important', textAlign: 'center'}"
                                      @change="changePage"
                        >
                        </a-pagination>
                    </div>
                </a-list>
            </a-layout-sider>

            <div class="detail-card-container" v-if="showDetailCard">
                <detail-card @closeCard="closeDetailCard" @choosePoint="choosePoint"
                             @showCJLU="toShowCJLU"
                             v-model:chosenPoint="chosenPoint" :uid="clickedUID" :location="center"/>
            </div>

            <a-layout style="padding: 0">
                <a-layout-content
                        :style="{ background: '#fff', padding: 0, margin: 0, minHeight: '100%' }"
                >
                    <baidu-map class="map" :center="center" :zoom="zoom" :scroll-wheel-zoom="true" @ready="mapReady">
                        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                        <bm-marker v-if="showMarker" v-for="place in list" :key="place" :position="place.location"
                                   :dragging="false"
                                   @click="markerClicked(place)"
                                   :animation="place.location.lng === center.lng && place.location.lat === center.lat ? 'BMAP_ANIMATION_BOUNCE' : ''">
                            <bm-label v-if="place.location.lng === center.lng && place.location.lat === center.lat"
                                      :content="content"
                                      @click="markerClicked(place)"
                                      :labelStyle="{color: 'black', border: '1px solid black', fontSize : '12px'}"
                                      :offset="{width: 0, height: -40}"/>
                        </bm-marker>
                        <bm-marker v-if="showPoint" :position="point.location"
                                   :dragging="false"
                                   @click="markerClicked(point)"
                                   animation="BMAP_ANIMATION_BOUNCE">
                            <bm-label :content="content"
                                      @click="markerClicked(point)"
                                      :labelStyle="{color: 'black', border: '1px solid black', fontSize : '12px'}"
                                      :offset="{width: 0, height: -40}"/>
                        </bm-marker>
                        <bm-marker v-if="showChooser" v-model:position="chosenPoint"
                                   :dragging="true"
                                   @dragend="afterDrag($event)"
                                   animation="">
                            <bm-label content="拖动选择起点"
                                      :labelStyle="{color: 'black', border: '1px solid black', fontSize : '12px'}"
                                      :offset="{width: 0, height: -22}"/>
                        </bm-marker>
                        <bm-marker v-if="showCJLU" :position="{lng: '120.369036', lat: '30.327401'}"
                                   :dragging="false"
                                   animation="BMAP_ANIMATION_BOUNCE">
                            <bm-label content="中国计量大学"
                                      :labelStyle="{color: 'black', border: '1px solid black', fontSize : '12px'}"
                                      :offset="{width: 0, height: -40}"/>
                        </bm-marker>
                        <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
                        <bm-map-type
                                :map-types="['BMAP_NORMAL_MAP', 'BMAP_SATELLITE_MAP']"
                                anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                                offset="0"
                        ></bm-map-type>
                    </baidu-map>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
import {BaiduMap, BmLabel, BmMarker, BmScale, BmNavigation, BmMapType} from "vue-baidu-map-3x";
import {getDetailedInfo, getPlaceList} from "@/requests";
import ListCard from "@/components/ListCard.vue";
import DetailCard from "@/components/DetailCard.vue";

export default {
    name: "MapView",
    components: {BmMapType, DetailCard, BmScale, BmLabel, BmMarker, BmNavigation, ListCard, BaiduMap},
    data() {
        return {
            zoom: 12,
            center: {lng: 120.170965, lat: 30.274355},
            showMarker: false,
            showPoint: false,
            point: {},
            content: '',
            list: [],
            currentPage: 1,
            pageSize: 5,
            total: null,
            map: null,
            showDetailCard: false,
            clickedUID: null,
            chosenPoint: {},
            showChooser: false,
            showCJLU: false,
        }
    },
    beforeCreate() {
        this.pageSize = 5
        this.currentPage = 1

        getPlaceList(this.pageSize, this.currentPage - 1)
            .then(res => {
                this.list = res.data.results
                this.total = res.data.total
            })
            .catch(err => console.log(err.message))
    },
    methods: {
        mapReady(e) {
            this.map = e.map

            if (typeof this.$route.params.uid !== 'undefined') {
                let uid = this.$route.params.uid
                getDetailedInfo(uid)
                    .then(res => {
                        this.point = res.data.result
                        this.content = res.data.result.name

                        this.openDetailCard(uid)
                        this.zoom = 18
                        this.center = res.data.result.location
                        this.showPoint = true
                    })
                    .catch(err => console.log(err.message))
            } else {
                this.changePage()
            }
        },
        mouseClicked(uid) {
            this.showPoint = false
            let place = this.list.filter((place) => place.uid === uid)[0]
            this.content = place.name
            this.showMarker = true

            this.openDetailCard(uid)
            // this.zoom = 18
            this.center = place.location
        },

        changePage() {
            this.showChooser = false
            this.showCJLU = false
            this.showPoint = false
            this.showMarker = true
            this.closeDetailCard()
            this.zoom = 12
            this.center = {lng: 120.170965, lat: 30.274355}

            getPlaceList(this.pageSize, this.currentPage - 1)
                .then(res => this.list = res.data.results)
                .catch(err => console.log(err.message))
        },

        openDetailCard(uid) {
            this.clickedUID = uid
            this.showDetailCard = true
        },
        closeDetailCard() {
            this.showCJLU = false
            this.showChooser = false
            this.showDetailCard = false
        },

        markerClicked(place) {
            this.openDetailCard(place.uid)
            this.center = place.location
            this.content = place.name
        },

        choosePoint() {
            this.showCJLU = false
            this.showChooser = true
            this.chosenPoint = {lng: this.center.lng + 0.005, lat: this.center.lat}
        },
        afterDrag({point}) {
            this.chosenPoint = point
        },
        toShowCJLU() {
            this.showChooser = false
            this.showCJLU = true
        },
    }
}
</script>

<style scoped>
.layout-container {
    min-height: calc(100vh - 64px);
}

.pagination-container {
    margin-top: 12px;
    margin-bottom: 10px;
}

.detail-card-container {
    position: fixed;
    top: 79px;
    left: 405px;
    z-index: 1000;
}

.map {
    min-height: calc(100vh - 64px);
    height: 100%;
    width: 100%;
}
</style>
