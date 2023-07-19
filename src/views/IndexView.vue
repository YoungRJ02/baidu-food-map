<template>
    <div class="carousel-container">
        <a-carousel arrows :autoplay="true">
            <template #prevArrow>
                <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                    <left-circle-outlined/>
                </div>
            </template>
            <template #nextArrow>
                <div class="custom-slick-arrow" style="right: 10px">
                    <right-circle-outlined/>
                </div>
            </template>
            <div>
                <a-image
                        src="/img/1.jpg"
                        :preview="false"
                        :placeholder="true"
                />
            </div>
            <div>
                <a-image
                        src="/img/2.jpg"
                        :preview="false"
                        :placeholder="true"
                />
            </div>
            <div>
                <a-image
                        src="/img/3.jpg"
                        :preview="false"
                        :placeholder="true"
                />
            </div>
            <div>
                <a-image
                        src="/img/4.jpg"
                        :preview="false"
                        :placeholder="true"
                />
            </div>
        </a-carousel>
    </div>

    <a-page-header
            style="border-bottom: 1px solid rgb(235, 237, 240); margin-top: 7px"
            title="探索杭州的美食"
    >
        <template #extra>
            <a-button type="primary" href="/map">查看更多</a-button>
        </template>
    </a-page-header>

    <div class="card-container">
        <div class="card" v-for="shop in shops">
            <a-card hoverable style="width: 300px" :key="shop.title">
                <template #cover>
                    <a-carousel arrows>
                        <template #prevArrow>
                            <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                                <left-outlined/>
                            </div>
                        </template>
                        <template #nextArrow>
                            <div class="custom-slick-arrow" style="right: 10px">
                                <right-outlined/>
                            </div>
                        </template>
                        <div v-for="url in shop.img" @click="cardClicked(shop.title)">
                            <a-image
                                    :src="url"
                                    height="200px"
                                    width="300px"
                                    :preview="false"
                                    :placeholder="true"
                            />
                        </div>
                    </a-carousel>
                </template>

                <a-card-meta>
                    <template #title>
                        <span @click="cardClicked(shop.title)">{{ shop.title }}</span>
                        <a href="javascript:" class="show-in-map" @click="toMap(shop.title)">
                            在地图中显示
                        </a>
                    </template>
                    <template #description>
                        <span @click="cardClicked(shop.title)">{{ shop.description }}</span>
                    </template>
                </a-card-meta>
            </a-card>
        </div>
    </div>

    <a-layout-footer :style="{ textAlign: 'center' }">
        Created by Charles Stark ©2023
    </a-layout-footer>
</template>

<script>
import leftCircleOutlined from "@ant-design/icons-vue/lib/icons/LeftCircleOutlined";
import rightCircleOutlined from "@ant-design/icons-vue/lib/icons/RightCircleOutlined";
import leftOutlined from "@ant-design/icons-vue/lib/icons/LeftOutlined";
import rightOutlined from "@ant-design/icons-vue/lib/icons/RightOutlined";
import compassOutlined from "@ant-design/icons-vue/lib/icons/CompassOutlined";

export default {
    name: "IndexView",
    components: {
        leftCircleOutlined,
        rightCircleOutlined,
        leftOutlined,
        rightOutlined,
        compassOutlined,
    },
    data() {
        return {
            shops: [
                {
                    title: '知味观',
                    description: '知味观是杭州的一个餐饮品牌、“中华老字号”，最初是孙翼斋于1913年创建的餐饮店“知味馆”，“知味停车，闻香下马”为其雅号，至今已有百年历史。',
                    img: [
                        '/img/1/1.jpeg',
                        '/img/1/2.jpeg',
                        '/img/1/3.jpeg',
                        '/img/1/4.jpeg',
                    ],
                },
                {
                    title: '外婆家',
                    description: '未能抛得杭州去，一半勾留是西湖。如果一定要给美食做个定义，那美食就是一种味觉记忆。外婆家将这种记忆扩张到了全国，温暖每一位客人的胃与心。',
                    img: [
                        '/img/2/1.jpg',
                        '/img/2/2.jpg',
                        '/img/2/3.jpg',
                        '/img/2/4.jpg',
                    ],
                },
                {
                    title: '张生记',
                    description: '我们吃到了地道的价廉物美的香喷喷的老鸭煲，同时欣赏到古朴、高雅、洋溢着江南民俗文化氛围的现代酒店装潢工艺。去张生记走一趟，挺有意思！',
                    img: [
                        '/img/3/1.jpeg',
                        '/img/3/2.jpg',
                        '/img/3/3.jpg',
                        '/img/3/4.jpg',
                    ],
                },
                {
                    title: '咬不得高祖生煎',
                    description: '来杭州，提起生煎，80%的人都推荐”咬不得“，就算冲着起得如此霸道的名字，也必须来尝试下。',
                    img: [
                        '/img/4/1.jpg',
                        '/img/4/2.jpg',
                        '/img/4/3.jpg',
                        '/img/4/4.jpg',
                    ],
                },
                {
                    title: '老头儿油爆虾',
                    description: '老头儿油爆虾将一道油爆虾做到极致，不仅杭州人赞不绝口，外地人到杭州，也一定会将其列到必吃清单里。',
                    img: [
                        '/img/5/1.jpg',
                        '/img/5/2.jpg',
                        '/img/5/3.jpg',
                        '/img/5/4.jpg',
                    ],
                },
                {
                    title: '新白鹿餐厅',
                    description: '说起杭州“新白鹿餐厅”，相信不少食客吃货对之印象颇深。“新白鹿”所到之处，无不延续排队传奇。',
                    img: [
                        '/img/6/1.jpeg',
                        '/img/6/2.jpg',
                        '/img/6/3.jpg',
                        '/img/6/4.jpg',
                    ],
                },
            ],
            list: ['知味观', '外婆家', '张生记', '咬不得高祖生煎', '老头儿油爆虾', '新白鹿餐厅'],
            uid: ['df06a546ce54c60af7231063', '0a168cb5ea4da5db8f55ec86', '3c0ea7c5249e2b85fbf0cb7e', '2848ffd61f33751649cc4a8b', 'c6a3ff1d87d9c7240b69d9ba', 'dffd46425bd54eab3c9a5e18'],
        }
    },
    methods: {
        cardClicked(title) {
            this.$router.push({
                path: `/info/${title}`
            })
        },
        toMap(title) {
            this.$router.push({
                path: `/map/${this.uid[this.list.indexOf(title)]}`
            })
        },
    }
}
</script>

<style scoped>
.ant-carousel :deep(.slick-slide) {
    text-align: center;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
    z-index: 1;
}

.ant-carousel :deep(.custom-slick-arrow:before) {
    display: none;
}

.ant-carousel :deep(.custom-slick-arrow:hover) {
    opacity: 0.5;
}

.ant-carousel :deep(.slick-slide h3) {
    color: #fff;
}

.carousel-container .ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
}

.carousel-container .ant-carousel :deep(.slick-slide) {
    height: calc(500 * 100vw / 1425);
}

.carousel-container .ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
    font-size: 25px;
}

.card-container .ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
    width: 15px;
    height: 15px;
    background-color: #555555;
}

.card-container .ant-carousel :deep(.slick-slide) {
    height: 200px;
}

.card-container .ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
    font-size: 15px;
}

.card-container {
    padding: 0 23px;
    margin-top: 12px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.card {
    margin: 10px 20px;
}

.show-in-map {
    font-size: 14px;
    color: gray;
    text-decoration: underline;
    float: right;
}
</style>
