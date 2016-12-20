/**
 * Router file for managing url changes
 */

/**
 * The main router object.
 *
 */
var router = {};

/**
 * Initializes the Router
 *
 */
router.init = function() {

  router.loadContent();
  router.listenPageChange();

};

/**
 * Gets the slug from the URL
 *
 * @return {string} slug Slug from URL
 */
router.getSlug = function() {

  slug = window.location.hash;

  if( "" === slug ) {

    return null;

  } else {

    return slug.substr( 1 );

  }

};

/**
 * Listener function for URL changes
 *
 */
router.listenPageChange = function() {

  window.addEventListener( 'hashchange', router.loadContent, false );

}


/**
 * Determines whether to load blog posts
 * or single post
 *
 */

router.loadContent = function() {

  var saved = editor.checkForSaved();

  if( saved ) {

    var url = router.getSlug();

    view.clearContent();

    if( null === url ) {

     view.loadSingleContent( 'home' );

   } else if ( 'blog' === url ) {

     view.loadBlogPosts();

   } else {

     view.loadSingleContent( url );

    }

  } else {
    return;
  }

}
