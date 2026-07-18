<template>
    <div>
        <Header></Header>
        <!-- Dynamic contents will be visualize here by using slot -->
            <slot></slot>
        <Footer></Footer>
    </div>
</template>

<script setup >
    import Header from './Header.vue';
    import Footer from './Footer.vue';
</script>