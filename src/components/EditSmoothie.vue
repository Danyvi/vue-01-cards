<template>
  <!-- we render the div only when smoothie is not null -->
  <!-- that is when the promise is fullfilled / data returned -->
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{ smoothie.title }} Smoothie</h2>
    <form @submit.prevent="EditSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>

      <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>

      <div class="field add-ingredient">
        <label for="add-ingredient">Add ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another ">
      </div>

      <div class="field center-align">
        <p v-if="feedback" class='red-text'>{{ feedback }}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from "slugify"
import db from '@/firebase/init'

export default {
  name: 'EditSmoothie',
  data(){
    return{
      smoothie: null,
      another: null,
      feedback: null
    }
  },
  methods: {
        AddSmoothie(){
      // console.log(this.title, this.ingredients);
      // check if the user has created a title: title is not null
      if(this.title){
        this.feedback = null
        // create a slug
        // everytime there is a space it will be replace with -
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        // add an obj that represent the record/document that we want to upload 
        // to the smoothie collection
        // We want to add the fields: 
        db.collection('smoothies')
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
          .then(
            () => {
              this.$router.push({ name: 'Home' })
            }
          )
          .catch(err => {
            console.log(err)
          })
      } else {
        this.feedback = "You must enter a Smoothie Title"
      }
    },
    addIng(){
      if(this.another){
        this.smoothie.ingredients.push(this.another);
        console.log(this.smoothie.ingredients);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = 'You must enter a value to add an ingredient'
      }
    },
    deleteIng(ing){
      this.smoothie.ingredients = this.smoothie.ingredients.filter( ingredient => {
        return ingredient != ing
      })
    },
    EditSmoothie() {
      console.log(this.smoothie.title, this.smoothie.ingredients);
      if(this.smoothie.title){
        this.feedback = null
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        // .doc() grab a single document from database collection
        db.collection('smoothies').doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          })
          .then(
            () => {
              this.$router.push({ name: 'Home' })
            }
          )
          .catch(err => {
            console.log(err)
          })
      } else {
        this.feedback = "You must enter a Smoothie Title"
      }
    }
  },
  // a good place to get data is in the created lifecycle hook
  // that runs whien the component is created but
  // not yet rendered to the DOM
  created(){
    // store the reference of the documents 
    // that we want to get, in a variable
    // this.$route.params.smoothie_slug -> is the slug from the URL
    let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
    // asynchronous task (get the data) that returns a promise
    // after we get the data we want we use 'then' to fire a function
    // snapshots (represents what is returned) is a collection of items
    ref.get().then( snapshot => {
      snapshot.forEach( doc => {
        // console.log(doc.data());
        this.smoothie = doc.data()
        this.smoothie.id = doc.id // we add an 'id' property to smoothie
      })
    })
  }
}
</script>

<style>
.edit-smoothie {
   margin-top: 60px;
   padding:20px;
   max-width:500px;
 }

 .edit-smoothie h2 {
   font-size:2em;
   margin: 20px auto;
 }

 .edit-smoothie .field{
   margin: 20px auto;
   position: relative;
 }

 .edit-smoothie .delete {
   position: absolute;
   right: 0;
   bottom: 16px;
   color: #aaa;
   font-size: 1.4em;
   cursor: pointer;
 }
</style>