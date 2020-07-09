<template>
    <div id="brand" class="width_center_1200">
        <ul>
            <li class="float_left" v-for="(v,i) in imgs" :key="i"><img :src="v.url" :class="i<4?'img1':'img2'" /></li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            imgs:[
                {url:'https://zcy-gov-open-doc.oss-cn-north-2-gov-1.aliyuncs.com/1072PT/null/10006214026/201911/78b23352-f08b-4414-887d-b5a9425a9445?x-oss-process=image/quality,Q_80'},
                {url:'https://zcy-gov-open-doc.oss-cn-north-2-gov-1.aliyuncs.com/1072PT/null/10006214026/201912/7886a391-a0ef-45ab-9bf1-581643eca0de?x-oss-process=image/quality,Q_80'},
                {url:'https://zcy-gov-open-doc.oss-cn-north-2-gov-1.aliyuncs.com/1072PT/339900/1000534977/20206/397f53d3-0c02-4de5-b8f9-336c3cd25802?x-oss-process=image/quality,Q_80'},
                {url:'https://zcy-gov-open-doc.oss-cn-north-2-gov-1.aliyuncs.com/1072PT/330106/10006166607/20206/be6fcb46-e4bb-49c6-8400-66abce594e7d?x-oss-process=image/quality,Q_80'},
                {url:'https://zcy-gov-open-doc.oss-cn-north-2-gov-1.aliyuncs.com/1072PT/null/10006214026/20204/d9e07839-d7c4-4eab-a7bc-5673acd2b8eb?x-oss-process=image/quality,Q_80'},
                {url:'https://zcy-gov-open-doc.oss-cn-north-2-gov-1.aliyuncs.com/1072PT/null/10006214026/20204/d9e07839-d7c4-4eab-a7bc-5673acd2b8eb?x-oss-process=image/quality,Q_80'},
                {url:'https://zcy-gov-open-doc.oss-cn-north-2-gov-1.aliyuncs.com/1072PT/null/10006214026/20204/d9e07839-d7c4-4eab-a7bc-5673acd2b8eb?x-oss-process=image/quality,Q_80'},
                {url:'https://zcy-gov-open-doc.oss-cn-north-2-gov-1.aliyuncs.com/1072PT/null/10006214026/20204/d9e07839-d7c4-4eab-a7bc-5673acd2b8eb?x-oss-process=image/quality,Q_80'},
                {url:'https://zcy-gov-open-doc.oss-cn-north-2-gov-1.aliyuncs.com/1072PT/null/10006214026/20204/d9e07839-d7c4-4eab-a7bc-5673acd2b8eb?x-oss-process=image/quality,Q_80'},
                {url:'https://zcy-gov-open-doc.oss-cn-north-2-gov-1.aliyuncs.com/1072PT/null/10006214026/20204/d9e07839-d7c4-4eab-a7bc-5673acd2b8eb?x-oss-process=image/quality,Q_80'},
                {url:'https://zcy-gov-open-doc.oss-cn-north-2-gov-1.aliyuncs.com/1072PT/null/10006214026/20204/d9e07839-d7c4-4eab-a7bc-5673acd2b8eb?x-oss-process=image/quality,Q_80'}
            ]
        }
    }
}
</script>

<style lang='scss' scoped>
    #brand{
        margin-top: 20px;
    }
    .img1{
        width: 290px;
        margin: 5px;
    }
    .img2{
        width: 165px;
        margin: 0 3px;
    }
</style>