<template>
    <div class="container">
        <div class="name section">{{ place.name }}</div>
        <div class="section">
            <span class="rate-text">{{ place.detail_info.overall_rating }}</span>
            <span class="rate-star">
                <a-rate :value="Number(place.detail_info.overall_rating)" allow-half disabled/>
            </span>
            <span class="comment-num">({{ place.detail_info.comment_num }})</span>
            <span class="price">人均&nbsp;¥{{ place.detail_info.price }}</span>
        </div>
        <div class="section">
            <span class="address">{{ place.address }}</span><br>
            <span class="hours">{{ place.detail_info.shop_hours }}</span>
        </div>
        <div class="section tag">
            <a-tag color="cyan" v-for="tag in place.detail_info.tag.split(';')">{{ tag }}</a-tag>
        </div>
    </div>
</template>

<script>
export default {
    name: "ListCard",
    props: ['place'],
}
</script>

<style scoped>
.container {
    width: 100%;
    padding: 0 16px;
    cursor: pointer;
}

.container:hover {
    background: rgba(245, 245, 245, 50);
}

.section {
    padding: 0;
}

.section span {
    margin: 0;
}

.name {
    font-size: 18px;
}

.rate-star, .comment-num, .price {
    padding-left: 9px;
}

.tag {
    padding: 0 5px;
}
</style>
