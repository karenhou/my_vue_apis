<template>
  <div class="container-fluid">
    <div class="text-center">
      <p>{{addedApiList.rssFeed}}</p>
      <button class="btn btn-primary" @click="rssModalShow = !rssModalShow">Rss Reader <i class="fas fa-plus-square icon-size"></i></button>
      <b-modal v-model="rssModalShow">
          <p>Pick a RSS you would like to add to page</p>
          <select v-model="selected">
            <option v-for="(x,index) in activeRssList" :key="index" :value="x">
              {{ x.name }}
            </option>
          </select>
          <div slot="modal-footer" class="w-100">
            <b-btn size="sm" class="float-right modal-btn btn" variant="primary" @click="rssModalShow = !rssModalShow">
              Cancel
            </b-btn>
            <b-btn size="sm" class="float-right modal-btn btn" variant="primary" @click="addRssContent()">
              Ok
            </b-btn>
        </div>
      </b-modal>
    </div>
    <div class="row">
        <div class="col-sm-4" v-if="addedApiList.length > 0" v-for="(x,index) in addedApiList" :key="index">
          <div class="card text-center" >
            <div class="card-body">
                <h2 class="card-title">{{x.rssFeed.feed.title}}</h2>
                <button class="btn btn-outline-danger btn-sm" @click="removeRss(x, index)"><i class="far fa-trash-alt icon-size"></i></button>
                <!-- <h6 class="card-subtitle mb-2 text-muted"></h6> -->
                <p class="card-text">
                    <ul v-for="(x, index) in x.rssFeed.items" class="text-left" :key=index>
                        <li><a :href=x.link>{{x.title}}</a></li>
                    </ul>
                </p>
            </div>
          </div>
        </div>
        <!-- <p v-if="addedApiList.length > 0">{{addedApiList}}</p> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RssContentNotAuth",
  data() {
    return {
      selected: "",
      rssModalShow: false,
      rssList: [
        { name: "HackerNewsJobs", 
          link: "https://hnrss.org/jobs", 
          saved: false
        },
        {
          name: "宅宅新聞",
          link: "https%3A%2F%2Fnews.gamme.com.tw%2Fcategory%2Fanime%2Ffeed",
          saved: false
        },
        {
          name: "巴哈姆特",
          link: "https://gnn.gamer.com.tw/rss.xml",
          saved: false
        },
        {
          name: "CNN",
          link: "http://rss.cnn.com/rss/cnn_world.rss",
          saved: false
        },
        {
          name: 'NBA',
          link: 'http://www.nba.com/rss/nba_rss.xml',
          saved: false
        },
        {
          name: 'TechWorld',
          link: 'https://www.techworld.com/rss',
          saved: false
        },
        {
          name: 'GameSpot',
          link: 'https://www.gamespot.com/feeds/game-news/',
          saved: false
        },
      ],
      addedApiList: []
    };
  },
  computed: {
      activeRssList: function() {
        return this.rssList.filter( u => {
          return !u.saved
      })
    }
  },
  methods: {
    removeRss(x, index) {
      this.addedApiList.splice(index,1)
      this.rssList.forEach(i => {
        if(i.name == x.name)
          i.saved = false
      })
    },
    addRssContent() {
      this.rssList.forEach(x => {
        if(x.name == this.selected.name)
          x.saved = true
      })
      this.rssModalShow = !this.rssModalShow;
      const rssAPIs = '1eeiobvm5s07o4thvz1xttbunqs3ufo1dddout7c'
      const api =
        "https://api.rss2json.com/v1/api.json?api_key=" + rssAPIs + "&rss_url=" + this.selected.link;
      axios
        .get(api)
        .then(response => {
          this.addedApiList.push({
            name: this.selected.name,
            link: api,
            rssFeed: response.data
          });
          // console.log('resp' + response)
        })
        .catch(err => {
            console.log('err ' + err.response.data);
        });
    },
  }
};
</script>


<style>
.row {
  margin-top: 1em;
}

.btn {
  margin-right: 1em;
}
.modal-btn {
  margin-left: 1em;
}

.apiBtn {
  background-color: #FFC500;
  color: white;
}

</style>
