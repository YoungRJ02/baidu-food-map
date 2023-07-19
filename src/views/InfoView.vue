<template>
    <div v-if="show">
        <a-page-header
                style="border: 1px solid rgb(235, 237, 240)"
                :title="title"
                @back="() => $router.go(-1)"
        >
            <template #extra>
                <a-button type="primary" @click="toMap">在地图中显示</a-button>
            </template>
        </a-page-header>

        <div class="container">
            <div class="content">
                {{ content.description }}
            </div>
            <a-image-preview-group>
                <a-image
                        v-for="url in content.img"
                        :src="url"
                        height="300px"
                        width="450px"
                        :preview="true"
                        :placeholder="true"
                />
            </a-image-preview-group>
        </div>
    </div>
    <a-back-top/>

    <a-layout-footer :style="{ textAlign: 'center' }">
        Created by Charles Stark ©2023
    </a-layout-footer>
</template>

<script>
export default {
    name: "InfoView",
    data() {
        return {
            title: '',
            show: false,
            list: ['知味观', '外婆家', '张生记', '咬不得高祖生煎', '老头儿油爆虾', '新白鹿餐厅'],
            uid: ['df06a546ce54c60af7231063', '0a168cb5ea4da5db8f55ec86', '3c0ea7c5249e2b85fbf0cb7e', '2848ffd61f33751649cc4a8b', 'c6a3ff1d87d9c7240b69d9ba', 'dffd46425bd54eab3c9a5e18'],
            content: {},
            contents: [
                {
                    description: '知味观是杭州的一个餐饮品牌、“中华老字号”，最初是孙翼斋于1913年创建的餐饮店“知味馆”，“知味停车，闻香下马”为其雅号，至今已有百年历史。它是杭城最具知名度的餐饮企业之一，位于杭州仁和路83号的总店建筑面积为7000多平米，餐位2000余个。知味观已在杭州、上海及杭州周边地区开设80多家各类连锁店，其中杭州地区有分店42家。1913年，绍兴人孙翼斋与人一起，在现在的湖滨公园附近摆摊卖馄饨，但是生意并不理想。孙翼斋读到《礼记·中庸》中的“人莫不饮食也，鲜能知味也”之后受到启发，写下八个大字“欲知其味，观料便知”，贴在摊旁。此举吸引不少市民前来品尝，馄饨摊生意兴隆。之后孙翼斋开设店面，就从八字中取“知味观”三字，名噪一时，宾客纷至。目前，知味观总店建筑面积为7000多平米，餐位2000余个，提供各色菜肴500余种。总店共四层，一楼为传统小吃大厅，二楼接待散客点菜吃饭，三四楼为豪华包厢。',
                    img: [
                        '/img/1/1.jpeg',
                        '/img/1/2.jpeg',
                        '/img/1/3.jpeg',
                        '/img/1/4.jpeg',
                    ]
                },
                {
                    description: '未能抛得杭州去，一半勾留是西湖。如果一定要给美食做个定义，那美食就是一种味觉记忆。在21年的发展中，诞生在西湖边的外婆家就将这种记忆快速复制、扩张到了全国，温暖每一位客人的胃与心。外婆家餐饮集团，成立于1998年，从杭州马塍路的“外婆家”餐厅开始发展。外婆喊你吃饭咯！如今，这一句亲昵的话语在全国60多个城市的180多家门店同时响起。而背后是外婆家餐饮连锁机构快速扩张的身影。在不断满足客人“善变”的需求，保持“排队长龙”的同时，外婆家又相继推出更多的新品牌，例如，主打健康蒸菜的蒸年青，一亮相就吸引了食客们的眼球。外婆家用不断创新、“小而精”，持续带给市场惊喜。',
                    img: [
                        '/img/2/1.jpg',
                        '/img/2/2.jpg',
                        '/img/2/3.jpg',
                        '/img/2/4.jpg',
                    ]
                },
                {
                    description: '自创业初，张生记就“传承杭帮文化、持续诚信经营”。坚守“用心服务、创新经营”理念，赢得了广大食客拥趸和业内人士的一致好评。铄古熔金新创意，酒楼装潢一奇葩。“我们吃到了地道的价廉物美的香喷喷的老鸭煲，同时欣赏到古朴、高雅、洋溢着江南民俗文化氛围的现代酒店装潢工艺。去张生记走一趟，挺有意思！这是许许多多的顾客在张生记用餐后情不自禁信口而出的一句赞语。百闻不如一见。当你伫立在张生记酒店宽阔整洁的大门口的时候，这里没有花头花脑的大面积顶饰吊灯，没有令人忘而生畏的狮雕虎塑，更没有赤身露体的西洋男女，一眼望去，在左右两侧雪白的高墙立面上，嵌挂着两块大大的明代花窗，那优美质朴的图案，生动逼真的人物，真让人宾至如归的亲切感受。如果你赶路有点累了，可以和一家人都坐在大门口的清代美人靠上小憩。',
                    img: [
                        '/img/3/1.jpeg',
                        '/img/3/2.jpg',
                        '/img/3/3.jpg',
                        '/img/3/4.jpg',
                    ]
                },
                {
                    description: '关于生煎，元代《云林堂饮食制度集》是记载：有一种禽肉包子“香油炸之尤妙”。明清起生煎大盛于江、浙、沪一带，形成多个流派，20世纪30年代开始出现生煎包子的专业店。来杭州，提起生煎，80%的人都推荐”咬不得“，就算冲着起得如此霸道的名字，也必须来尝试下。“此物有三咬不得。以筷夹之，底脆面柔，就口恐滑落也；甫出锅，皮虽温，汁尤烫，恐惊舌也；张口咬之，汁水突暴，恐溅身也。或曰，凡行事者把握未定则做不得；性急又做不得；无意外之备又做不得。故名咬不得以醒之，食得此包则诸事可成。”',
                    img: [
                        '/img/4/1.jpg',
                        '/img/4/2.jpg',
                        '/img/4/3.jpg',
                        '/img/4/4.jpg',
                    ]
                },
                {
                    description: '说到杭州餐饮，最先想到的是外婆家、绿茶、新白鹿这些在全国颇具影响力的品牌，但在杭州，还有一个32年的品牌不得不提，那就是——老头儿油爆虾。老头儿油爆虾将一道油爆虾做到极致，不仅杭州人赞不绝口，外地人到杭州旅游，也一定会将这个品牌和这道菜列到必吃清单里。这个品牌的魅力从何而来？门店装修上摒弃了快时尚风格，以杭州特色为设计主题。如将西湖知名景点、历史名人文化等贯穿其中，既不失文化的典雅，也迎合了年轻人的时尚审美。菜品丰富，加上饮品多达100个产品，主推的仍然是朱先生传下来的4道主打名菜，简称“四大金刚”。',
                    img: [
                        '/img/5/1.jpg',
                        '/img/5/2.jpg',
                        '/img/5/3.jpg',
                        '/img/5/4.jpg',
                    ]
                },
                {
                    description: '说起杭州“新白鹿餐厅”，相信不少食客吃货对之印象颇深。从第一间店杭州耶稣堂弄店1998年开业开始排队以来，“新白鹿”成为连锁餐厅品牌，覆盖杭州、上海、湖州和深圳四个城市。“新白鹿”所到之处，无不延续排队传奇。在吃饭高峰期，家家餐厅都人气十足。新白鹿追求“三最”——最好的产品、最好的服务、最好的环境，同时，却只有中等的价位。这四大要素是杭帮菜的精髓，也是杭帮菜今天为何这么火的原因。',
                    img: [
                        '/img/6/1.jpeg',
                        '/img/6/2.jpg',
                        '/img/6/3.jpg',
                        '/img/6/4.jpg',
                    ]
                },
            ]
        }
    },
    methods: {
        toMap() {
            this.$router.push({
                path: `/map/${this.uid[this.list.indexOf(this.title)]}`
            })
        }
    },
    mounted() {
        if (!this.list.includes(this.$route.params.title)) {
            this.$router.push('/404')
        }
        this.show = true
        this.title = this.$route.params.title
        this.content = this.contents[this.list.indexOf(this.title)]
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.content {
    width: 550px;
    font-size: 15px;
    margin-bottom: 10px;
}
</style>
