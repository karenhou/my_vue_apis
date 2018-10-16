<template>
    <div class="profile container">
        <div class="jumbotron">
            <h1>This is the user Profile of {{$route.params.profile.name}}</h1>
            <p>profile: {{ $route.params.profile.email }} </p>
            <p>id: {{$route.params.profile.id}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'userProfile',
    // props: ['profile'],
    data() {
        return {

        }
    },
    
}
</script>


<style>
.profile {
    margin-top: 5em;
}
</style>
