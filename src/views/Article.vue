<template>
  <div class="article">
    <HeaderApp></HeaderApp>
    
    <main>
      <div id="article-banner" :alt="`listing-${post.id}`">
          <h1>{{ post.title }}</h1>
      </div>

      <div id="page-article">
        
        <router-link :to="{name: 'Listing'}" class="product-link">Retour à la liste des articles</router-link>

        <div class="result"></div>
        <div id="article" v-if="post">
          <p id="article-date">publié le 18 mai 2020</p>

          <p v-html="post.body" class="article-content"></p>
        </div>

        <div id="sharedButton" v-if="shared" v-on:click="sharedAdd">Partagez</div>

        <hr>

        <div id="article-comment">
          <h2>COMMENTAIRES</h2>

          <div v-if="comments">
            <div id="article-comment-list">
              <div v-for="comment in comments"  v-bind:key="comment.id">
                <h3>{{ comment.author }}</h3>
                <p class="article-comment-date">18 mai 2020</p>
                <p class="article-comment-message">{{ comment.message }}</p>
              </div>
            </div> 
          </div>
          

          
          <h2>ÉCRIRE UN COMMENTAIRE</h2>

          <form action="/" method="post" v-on:submit="addComment">
            <div class="article-comment-form-flex">
              <input type="text" name="author" placeholder="Nom">
              <input type="text" name="Email" placeholder="Email">
            </div>

            <textarea name="comment" placeholder="Contenu"></textarea>

            <button type="submit">Envoyer</button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  main{
    #article-banner{
        height: 80vh;
        overflow: hidden;
        background: url("../assets/img/listing/listing-1.png") no-repeat fixed;
        content: attr(alt);
        background-size: cover;
        h1{
          position: absolute;
          bottom: calc(20vh + 10px);
          left: 30px;
          text-align: left;
          color: #fff;
          font-size: 50px;
        }
      }

      
    div#page-article{
      

      width: 70%;
      margin: 40px auto 0 auto;

      p{
        margin-top: 15px;
      }

      p.article-content{
          // background: blue;

        *{
          background: blue;
          border: 5px solid red;
          display: block;
          margin: 15px;
        }
      } 


      div{
        &#article{
          h1{
            text-align: left;
          }

          img{
            width: 100%;
            margin: 10px 0;
          }
        }

        

        &#article-comment{
          div#article-comment-list{
            div.article-comment{
              margin-bottom: 30px;
              h3{
                margin-top: 20px;
              }

              p{
                &.article-comment-date{
                  margin-bottom: 10px;
                }
              }
            }
          }

          form{
            margin-top: 10px;
                input{
                  display: block;
                  border: 1px solid #434550;
                  border-radius: 3px;
                  padding: 10px ;
                  border: 1px solid #434550;
                }

                textarea{
                  display: block;
                  width: 100%;
                  max-width: 100%;
                  margin-top: 10px;
                  min-height: 100px;
                  padding: 10px ;
                  border: 1px solid #434550;
                }

                button{
                  border: 1px solid #434550;
                  padding: 15px 30px;
                  margin-top: 10px;
                  display: inline-block;
                  background: none;
                  color: #434550;
                  cursor: pointer;
                  font-weight: bold;
                }

                div.article-comment-form-flex{
                  display: flex;
                  justify-content: space-between;
                  input{
                    width: 49%;
                  }
                }
              }
        }
      }

      hr{
        margin: 50px 0;
      }

      #sharedButton{
        border: 1px solid #434550;
        border-radius: 3px;
        padding: 15px 15px;
        width: 100px;
        margin-top: 15px;
        cursor: pointer;
      }


    }
  }

  @media (max-width: 900px) {
    main{
      div#page-article{
        width: 80%;
      }
    }
    
  }

  @media (max-width: 700px) {
    main{
      div#page-article{
        width: 95%;
        div#article-list{
          div.article{
            width: 100%;
          }
        }
      }
    }
  }
</style>

<script>
import HeaderApp from '@/components/HeaderApp.vue';

export default {
  metaInfo: {
      title: `Article`,
    },
  components: {
    HeaderApp,
  },
  data() {
    return {
      post: null,
      comments: null,
      shared: false
    }
  },
  created() {
    fetch(`https://my-json-server.typicode.com/RomainDreidemy/API-le-petit-pas-marseillais/posts/${this.$route.params.slug}`).then((response) => {
      response.json().then((data) => {
        this.post = data
        //Stock la page pour garder un historique
        localStorage.setItem(this.$route.path, this.post.title);
      })

      
    });

    fetch(`https://my-json-server.typicode.com/RomainDreidemy/API-le-petit-pas-marseillais/comments`).then((response) => {
      response.json().then((data) => {
        const result = data.filter(d => d.idArticle == this.post.id);
        this.comments = result
      })
    });

    if(window.navigator.share){
      console.log('Share');
      this.shared = true;
    }else{
      console.log('not share');
    }

    


  },
  mounted() {
    
  },
  methods: {
    addComment: (event) => {
      event.preventDefault();

      fetch(`https://my-json-server.typicode.com/RomainDreidemy/API-le-petit-pas-marseillais/comments`, {
        method: 'post',
        body: {
          "id": 2,
          "idArticle": 2,
          "author": "Romain Dreidemy",
          "message": "Les savons c'est trop bien"
        }
      })
    },

    sharedAdd: () => {
      const shareData = {
        title: 'Le Petit Pas Marseillais',
        text: 'Partagez cet incroyable article sur le savon',
        url: window.location.href,
      }

      // const sharedButton = document.getElementById('sharedButton')
      const resultPara = document.querySelector('.result');

      // Must be triggered some kind of "user activation"
      try {
        navigator.share(shareData).then(() => {
          resultPara.textContent = 'MDN shared successfully'
        })
      } catch(err) {
        resultPara.textContent = 'Error: ' + err
      }
    }
  }
}

</script>