<style scoped>
.error-container {
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    width: 38%;
}
.text-center {
    text-align: center !important;
}
.error-number {
    font-family: 'Montserrat';
    font-size: 90px;
    line-height: 90px;
    letter-spacing: -0.08px;
    font-weight: 300;
    color: #2c2c2c;
}
.semi-bold {
    font-weight: 400 !important;
    font-size: 28px;
    line-height: 40px;
    margin: 10px 0;
    font-family: "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #2c2c2c;
}
p {
    display: block;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.01em;
    line-height: 22px;
    margin: 0px 0px 10px 0px;
    font-style: normal;
    white-space: normal;
    font-size: 13px;
    line-height: 20px;
}
a {
    text-shadow: none !important;
    color: #3a8fc8;
    transition: color 0.1s linear 0s, background-color 0.1s linear 0s, opacity 0.2s linear 0s !important;
}
</style>
<template>
    <div class="error-container text-center">
        <h1 class="error-number">404</h1>
        <h2 class="semi-bold">Sorry but we couldn't find this page</h2>
        <p>This page you are looking for does not exsist.
            <a href="#">Go Home?</a>
        </p>
        <!--<div class="error-container-innner text-center">
                <form>
                    <div class="form-group form-group-default input-group transparent text-left">
                        <label>Search</label>
                        <input class="form-control" placeholder="Try searching the missing page" type="email">
                        <span class="input-group-addon pg-search"></span>
                    </div>
                </form>
            </div>-->
    </div>
</template>

<script>
</script>
