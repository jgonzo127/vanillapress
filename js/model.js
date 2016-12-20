/**
 * Model file for working with data
 */

/**
 * Main Model Object
 *
 */
var model = {};

/**
 * Initializes the Model
 *
 */
model.init = function() {

  model.updateLocalStore( data );

}

/**
 * Gets posts from local store
 *
 * @return {Object[]} posts Array of posts
 */
model.getPosts = function() {

  var posts = model.getLocalStore().posts;
  return posts;

}

/**
 * Get a single post based on url slug
 *
 * @param {string} slug The slug for the post
 * @return {Object} post Single post
 *
 */
model.getPost = function( slug ) {

  var posts = model.getLocalStore().posts;

  // Get the post from store based on the slug
  for( i = 0, max = posts.length; i < max; i++  ) {

    if( slug === posts[i].slug ) {
      return posts[i];
    }

  }

  return null;

}

/**
 * Gets pages from local store
 *
 * @return {Object[]} pages Array of page objects
 */
 model.getPages = function() {

   var pages = model.getLocalStore().pages;
   return pages;

 }

/**
 * Get a single page based on url slug
 *
 * @param {String} slug The slug for the page
 * @return {Object} page  Single page object
 *
 */
 model.getPage = function( slug ) {

   var pages = model.getLocalStore().pages;

   // Get the post from store based on the slug
   for( i = 0, max = pages.length; i < max; i++  ) {

     if( slug === pages[i].slug ) {
       return pages[i];
     }

   }

   return null;

 }

/**
 * Gets content from local store
 *
 * @return {Object} store Native JavaScript object from local store
 */
model.getLocalStore = function() {

  var store = JSON.parse( localStorage.getItem( 'vanillaPress' ) );

  return store;

}

/**
 * Saves temporary store to local storage.
 *
 * @param {Object} store Native JavaScript object with site data
 */
model.updateLocalStore = function( store ) {

  localStorage.setItem( 'vanillaPress', JSON.stringify( store ) );

}

/**
 * Deletes data from local storage
 *
 */
model.removeLocalStore = function() {

  localStorage.removeItem( 'vanillaPress' );

}
